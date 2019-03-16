# CUC_face2music
Our AI project.
## python part

### 安装第三方库
*numpy matplotlib pillow*
```shell
sudo pip3 install numpy matplotlib pillow
```

*face_recognition*

```shell
sudo pip3 install CMake
```
dlib install:
https://gist.github.com/ageitgey/629d75c1baac34dfa5ca2a1928a7aeaf

```shell
sudo pip3 install face_recognition
```

## Run Py file by java
```java
//Text Code
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Text {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Process proc;
		try {
			proc = Runtime.getRuntime().exec("python3 /home/arron/PycharmProjects/Face2Music/Demo4Learning/Face_recognition.py");// 执行py文件
			//用输入输出流来截取结果
			BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
			String line = null;
			while ((line = in.readLine()) != null) {
				System.out.println(line);
			}
			in.close();
			proc.waitFor();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} 
	}
}

```
利用java的Runtime类来调用shell命令并通过读取缓冲区的字符来获取python 文件输出的信息。（在linux可用，未测试windows机）
取消使用jython来运行py文件：该方法不能很好的运用第三方库（PIL/dlib/numpy/face_recognition...）
具体使用方法：https://blog.csdn.net/IT_xiao_bai/article/details/79074988  from  IT_xiao_bai