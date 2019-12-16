package com.sweii.server;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;

import org.apache.mina.common.IoAcceptor;
import org.apache.mina.common.IoAcceptorConfig;
import org.apache.mina.common.IoSession;
import org.apache.mina.transport.socket.nio.SocketAcceptor;
import org.apache.mina.transport.socket.nio.SocketAcceptorConfig;
/**
 * 服务器
 * @author duncan
 * @createTime 2012-7-11
 * @version 1.0
 */
public class Server {
    private Map<String, IoSession> sessions = new HashMap<String, IoSession>();
    public Server(int port, ServerHandler handler) {
	try {
	    IoAcceptor acceptor = new SocketAcceptor();
	    IoAcceptorConfig config = new SocketAcceptorConfig();
	    handler.setServer(this);
	  //  acceptor.
	    acceptor.bind(new InetSocketAddress(port), handler, config);
	    System.out.println("Listening on port " + port);
	} catch (Exception e) {
	    e.printStackTrace();
	}
    }
    public static void main(String[] args) throws Exception {
	//Server server=new Server(1766);
	Thread.sleep(1000000);
    }
    /**
     * @param number 为控制器编号
     * @param doorId 为控制器门号
     * @author duncan
     * @createTime 2012-7-13
     * @version 1.0
     */
    public boolean openDoor(Integer number, Integer doorId) {
	IoSession session = sessions.get("num" + number);
	if (session != null) {
	    if (doorId == 1) {//远程开门读卡器1
		session.write("efefefefeeeeeeee0010000000161101");
	    } else if (doorId == 2) {//远程开门读卡器2
		session.write("efefefefeeeeeeee0010000000161102");
	    } else if (doorId == 3) {//远程开门读卡器3
		session.write("efefefefeeeeeeee0010000000161104");
	    } else if (doorId == 4) {//远程开门读卡器4
		session.write("efefefefeeeeeeee0010000000161108");
	    }
	    return true;
	} else {
	    return false;
	}
    }
    public Map<String, IoSession> getSessions() {
	return sessions;
    }
    public void setSessions(Map<String, IoSession> sessions) {
	this.sessions = sessions;
    }
}
