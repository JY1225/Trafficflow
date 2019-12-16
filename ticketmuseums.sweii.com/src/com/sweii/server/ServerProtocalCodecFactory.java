package com.sweii.server;

import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;

public class ServerProtocalCodecFactory implements ProtocolCodecFactory {
	private final ServerProtocolEncoder encoder;
	private final ServerProtocalDecoder decoder;

	public ServerProtocalCodecFactory() {
		encoder = new ServerProtocolEncoder();
		decoder = new ServerProtocalDecoder();
	}

	public ProtocolEncoder getEncoder() {
		return encoder;
	}

	public ProtocolDecoder getDecoder() {
		return decoder;
	}
}
