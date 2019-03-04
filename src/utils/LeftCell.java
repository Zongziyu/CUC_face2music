package utils;

import application.Dom;
import javafx.event.EventHandler;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import javafx.scene.web.WebEngine;

public class LeftCell
{
	public static int sumOfArticles;
	HBox main = new HBox();
	BorderPane left = new BorderPane();
	BorderPane center = new BorderPane();
	BorderPane right = new BorderPane();
	ImageView icon = new ImageView();
	Text title;
	Text num;
	Dom rss;
	public LeftCell(String rssUrl, String iconUrl, String title_, VBox centerBoard, WebEngine webEngine)
	{
		
		try
		{
			rss = new Dom(rssUrl,webEngine);
		}catch(Exception e) {e.printStackTrace();}
		
		
		main.setMinSize(250, 50);
		main.getStyleClass().add("backgroundWhite");
		left.setMinSize(50, 50);
		center.setMinSize(150, 50);
		right.setMinSize(50, 50);
		Image img = new Image(iconUrl);
		icon.setImage(img);
		icon.setFitWidth(30);
		icon.setPreserveRatio(true);
		icon.setSmooth(true);
		icon.setCache(true);
		title = new Text(title_);
		title.getStyleClass().addAll("text16","textBold");
		
		num = new Text(String.valueOf(rss.getSize()));
		title.getStyleClass().addAll("text14","textBold");
		
		sumOfArticles += rss.getSize();
		
		left.setCenter(icon);
		center.setCenter(title);
		right.setCenter(num);
		
		
		main.getChildren().addAll(left,center,right);
		
		main.setOnMouseEntered(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	        	System.out.println("entered");
	        	//main.getStyleClass().remove("backgroundWhite"); 
	            main.getStyleClass().add("backgroundGray2");            
	        }});
		main.setOnMouseExited(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	        	System.out.println("out");
	        	main.getStyleClass().remove("backgroundGray2");      
	        	//main.getStyleClass().add("backgroundWhite"); 
	        }});
		main.setOnMouseClicked(new EventHandler<MouseEvent>() {

	        @Override
	        public void handle(MouseEvent event)
	        {
	        	System.out.println("clicked");
	        	try 
	        	{
	        		centerBoard.getChildren().remove(centerBoard.getChildren().size()-1);
		        	centerBoard.getChildren().add(rss.get());
	        	}catch(Exception e) {e.printStackTrace();};
	        	
	        }});
	}
	
	public HBox get()
	{
		return main;
	}
}
