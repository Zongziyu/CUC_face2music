package utils;

import javafx.scene.Node;
import javafx.scene.layout.BorderPane;

public class CenterPane 
{
	BorderPane main = new BorderPane();
	public CenterPane(int width, int height, Node node)
	{
		main.setMinSize(width, height);
		main.setCenter(node);
	}
	public BorderPane get()
	{
		return main;
	}
}