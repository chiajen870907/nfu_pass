function main() {
    getCaptha();
}


function getCaptha() {
    var canvas1 = document.createElement("canvas");
    canvas1.setAttribute("id", "IMGcanvas");
    document.getElementsByClassName("date")[0].appendChild(canvas1);
    var captcha =  document.getElementById("imgCheck")
    var ctx = canvas1.getContext("2d")
    canvas1.width = captcha.naturalWidth;
    canvas1.height = captcha.naturalHeight;
    ctx.drawImage(captcha,0,0,canvas1.width,canvas1.height);
    cvPic()
}


function cvPic() {
    var cvCanvas = document.createElement("canvas");
    cvCanvas.setAttribute("id","CVcanvas")
    document.getElementsByClassName("date")[0].appendChild(cvCanvas);
    cvCanvas.style.backgroundColor = "cornsilk";
    var src = cv.imread('IMGcanvas');
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_BGR2GRAY);
    cv.threshold(dst,dst, 80, 255, cv.THRESH_BINARY_INV);
    cv.imshow('CVcanvas', dst);
    src.delete(); dst.delete();
    ocr();

}

function ocr() {
    console.log("OCR Start");
    var ocrCanvas = document.getElementById("IMGcanvas");
    Tesseract.recognize(ocrCanvas)
    .then(({ data: { text } }) => {
        console.log(text);
        var captha = text;
        keyin(captha);
    });
    
}

function keyin(captha) {
    console.log(captha);
    document.getElementById("txtCheck").value = captha;
    autologin();
}

function autologin() {
    console.log("Login...");
    document.getElementById("txtLoginId").value = "40671231";
    document.getElementById("txtLoginPwd").value = "Chiajen1831";
    var loginbtn = document.getElementById("btnLogin");
    console.log(loginbtn);
    loginbtn.click();
    
}

window.onload = function(){
    t=setTimeout("main()",100);
};


