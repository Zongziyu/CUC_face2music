function send() {
    var canvasElement = document.getElementById("photo_")
    var MIME_TYPE = "image/png";
    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var byteString = atob(imgURL.split(',')[1]);
    var mimeString = imgURL.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    blob = new Blob([ab], {type: mimeString});
    var formData = new FormData();
    formData.append("file", blob);
    console.log(blob);
    $.ajax({
        url: "/send",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            alert(returndata);
        },
        error: function (returndata) {
            alert("上传失败！");
        }
    })
}