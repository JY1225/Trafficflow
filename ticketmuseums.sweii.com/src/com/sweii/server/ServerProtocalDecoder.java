package com.sweii.server;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;

import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
public class ServerProtocalDecoder implements ProtocolDecoder {
    private static final String CONTEXT = ServerProtocalDecoder.class.getName() + ".context";
    private final Charset charset;
    private int maxPackLength = 171520;
    private int count = 0;
    public ServerProtocalDecoder() {
	this(Charset.defaultCharset());
    }
    public ServerProtocalDecoder(Charset charset) {
	this.charset = charset;
    }
    public int getMaxLineLength() {
	return maxPackLength;
    }
    public void setMaxLineLength(int maxLineLength) {
	if (maxLineLength <= 0) {
	    throw new IllegalArgumentException("maxLineLength: " + maxLineLength);
	}
	this.maxPackLength = maxLineLength;
    }
    private Context getContext(IoSession session) {
	Context ctx;
	ctx = (Context) session.getAttribute(CONTEXT);
	if (ctx == null) {
	    ctx = new Context();
	    session.setAttribute(CONTEXT, ctx);
	}
	return ctx;
    }
    public void decode(IoSession session, ByteBuffer in, ProtocolDecoderOutput out) throws Exception {
	final int packHeadLength = 11;
	//先获取上次的处理上下文，其中可能有未处理完的数据      
	Context ctx = getContext(session);
	// 先把当前buffer中的数据追加到Context的buffer当中       
	ctx.append(in);
	//把position指向0位置，把limit指向原来的position位置      
	ByteBuffer buf = ctx.getBuf();
	buf.flip(); //此方法设置: limit=position,position=0,mark=-1
	int totalSize = buf.remaining();// 然后按数据包的协议进行读取  
	Server server = (Server) session.getAttribute("server");
	synchronized (server) {
	    while (totalSize >= packHeadLength) {
			buf.mark(); //此方法设置:mark=position,即:mark=0;
			byte[] header = new byte[8];// 读取消息头部分 
			buf.get(header);//取8个字节
			totalSize = totalSize - 8;
			String head = UdpUtil.byte2hex(header).toLowerCase();
			if (head.equals("efefefefeeeeeeee")) {//消息头
			    byte[] s = new byte[3];
			    buf.get(s);
			    totalSize = totalSize - 3;
			    String size = UdpUtil.byte2hex(s).toLowerCase();
			    size=size.toString().substring(4,6)+size.toString().substring(2,4);		    
			    int dataSize = Long.valueOf(size, 16).intValue();//数据长度
			    if ((totalSize >= dataSize-11)&&(dataSize-11)>0) {
					byte[] data = new byte[dataSize - 11];
					buf.get(data);
					totalSize = totalSize - dataSize;
					String message = UdpUtil.byte2hex(data).toLowerCase();
					out.write(message);
					out.flush();
					totalSize = buf.remaining();// 然后按数据包的协议进行读取
			    } else {
				   buf.reset(); //未接收完成
			    }
			} else {//头部错误，进行清空数据 
			    buf.clear();
			}
	    }
	    if (buf.hasRemaining()) {//      
		// 将数据移到buffer的最前面       
		ByteBuffer temp = ByteBuffer.allocate(maxPackLength).setAutoExpand(true);
		temp.put(buf);
		temp.flip();
		buf.clear();
		buf.put(temp);
	    } else {// 如果数据已经处理完毕，进行清空      
		buf.clear();
	    }
	}
    }
    /**
     * 把数据移动到buffer最前面
     * 
     * @param buf
     */
    private void moveDateToFirst(ByteBuffer buf) {
	ByteBuffer temp = ByteBuffer.allocate(maxPackLength).setAutoExpand(true);
	temp.put(buf);
	temp.flip();
	buf.clear();
	buf.put(temp);
    }
    public void finishDecode(IoSession session, ProtocolDecoderOutput out) throws Exception {
    }
    public void dispose(IoSession session) throws Exception {
	Context ctx = (Context) session.getAttribute(CONTEXT);
	if (ctx != null) {
	    session.removeAttribute(CONTEXT);
	}
    }
    // 记录上下文，因为数据触发没有规模，很可能只收到数据包的一半
    // 所以，需要上下文拼起来才能完整的处理
    private class Context {
	private final CharsetDecoder decoder;
	private ByteBuffer buf;
	private int matchCount = 0;
	private int overflowPosition = 0;
	private Context() {
	    decoder = charset.newDecoder();
	    buf = ByteBuffer.allocate(80).setAutoExpand(true);
	}
	public CharsetDecoder getDecoder() {
	    return decoder;
	}
	public int getOverflowPosition() {
	    return overflowPosition;
	}
	public int getMatchCount() {
	    return matchCount;
	}
	public void setMatchCount(int matchCount) {
	    this.matchCount = matchCount;
	}
	public void reset() {
	    overflowPosition = 0;
	    matchCount = 0;
	    decoder.reset();
	}
	public ByteBuffer getBuf() {
	    return buf;
	}
	public void setBuf(ByteBuffer buf) {
	    this.buf = buf;
	}
	public void append(ByteBuffer in) {
	    getBuf().put(in);
	}
    }
}
