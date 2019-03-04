package utils;

import javafx.scene.web.WebEngine;

public class WEBView implements Runnable
{
	private Thread t;
	String url;
	WebEngine webEngine;
	public WEBView(WebEngine engine,String url_)
	{
		url = url_;
		webEngine = engine;
	}
	public void run()
	{
		webEngine.load(url);
	}
	public void start()
	{
		if(t==null)
		{
			t = new Thread(this,"web");
		}
	}
}
