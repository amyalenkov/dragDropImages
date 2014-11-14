function Template(templateDefault, canvas){
    this.templateName = templateDefault;
    this.canvas = canvas;
    this.pushImageInTemplate = function(img, dropX, dropY){
        if(this.templateName == 'template1'){
            setTemplate1(img, dropX, dropY)
        }else if(this.templateName == 'template2'){
            setTemplate2(img, dropX, dropY)
        }else if(this.templateName == 'template3'){
            setTemplate3(img, dropX, dropY)
        }
    };
    function setTemplate1(img, dropX, dropY){
        if(dropX < this.canvas.width/2){
            if(dropY < this.canvas.height/2){
                setImageOnCanvas(img, this.canvas.height/4, this.canvas.width/4,
                    (this.canvas.height/img.height)/2, (this.canvas.width/img.width)/2);
            }else{
                setImageOnCanvas(img, this.canvas.height - this.canvas.height / 4, this.canvas.width/4,
                    (this.canvas.height/img.height)/2, (this.canvas.width/img.width)/2);
            }
        }else{
            if(dropY < this.canvas.height/2){
                setImageOnCanvas(img, this.canvas.height/4, this.canvas.width - this.canvas.height/4,
                    (this.canvas.height/img.height)/2, (this.canvas.width/img.width)/2);
            }else{
                setImageOnCanvas(img, this.canvas.height - this.canvas.height/4, this.canvas.width - this.canvas.height/4,
                    (this.canvas.height/img.height)/2, (this.canvas.width/img.width)/2);
            }
        }
    }
    function setTemplate2(img, dropX, dropY){
        if(dropX < this.canvas.width/2){
            setImageOnCanvas(img, this.canvas.height/2 , this.canvas.width/4,
                (this.canvas.height/img.height), (this.canvas.width/img.width)/2);
        }else{
            setImageOnCanvas(img, this.canvas.height/2, this.canvas.width/2 + this.canvas.width/4,
                (this.canvas.height/img.height), (this.canvas.width/img.width)/2);
        }
    }
    function setTemplate3(img, dropX, dropY){
        if(dropY < this.canvas.height/2){
            setImageOnCanvas(img, this.canvas.height/4 , this.canvas.width/2,
                (this.canvas.height/img.height)/2, (this.canvas.width/img.width));
        }else{
            setImageOnCanvas(img, this.canvas.height - this.canvas.height/4, this.canvas.width/2,
                (this.canvas.height/img.height)/2, (this.canvas.width/img.width));
        }
    }

    function setImageOnCanvas(img, top, left, scaleY, scaleX){
        img.setTop(top);
        img.setLeft(left);
        img.scale(scaleY)
        //img.setScaleY(scaleY);
        //img.setScaleX(scaleX);
        this.canvas.calcOffset();
        this.canvas.renderAll();
    }
}