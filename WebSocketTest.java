

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class WebSocketTest {
    private Session session;
    int pic_height; 
    int pic_width;
    int now_line;
    short pic[][]= new short[3000][3000];
    @OnOpen
    public void onOpen(Session session){
        this.session = session;
        System.out.println("¿ª");
        pic_height=0;
        pic_width=0;
        now_line=0;
    }
    @OnClose
    public void onClose(){
    	System.out.println("¹Ø");
    	
    }
    @OnMessage
    public void onMessage(String message, Session session) {
    	if(pic_height==0)
    	{
    		pic_height=Integer.parseInt(message);
    		System.out.println(pic_height);
    	}
    	else
    	{
    		if(pic_width==0)
    		{
    			pic_width=message.length();
    			
    		}
    		for(int i = 0; i<pic_width;i++)
    		{
    			pic[now_line][i]=(short)(message.charAt(i));
    		}
    		
    		for(int i=0; i< pic_width;i++)
    		{
    			System.out.print(pic[now_line][i]);
    			System.out.print(" ");
    		}
    		now_line++;
    		System.out.println();
    	}
    	
    }
}