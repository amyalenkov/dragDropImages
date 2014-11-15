function Template(templateDefault, canvas){
    this.templateName = templateDefault;
    this.canvas = canvas;
    this.pushImageInTemplate = function(img, dropX, dropY){
        if(this.templateName == 'template1'){
            setTemplate(img, 2, 2, dropX, dropY);
        }else if(this.templateName == 'template2'){
            setTemplate(img, 3, 3, dropX, dropY);
        }else if(this.templateName == 'template3'){
            setTemplate3(img, 2, 3,dropX, dropY)
        }else if(this.templateName == 'template4'){
            setTemplate(img, 4, 4, dropX, dropY);
        }else if(this.templateName == 'template5'){
            setTemplate(img, 5, 5, dropX, dropY);
        }else if(this.templateName == 'template6'){
            setTemplate(img, 1, 2, dropX, dropY)
        }
    };

    function setTemplate3(img, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(this.canvas.width, amount_part_x, dropX);
        var y = getCoordinate(this.canvas.height, amount_part_y, dropY);
        if(x == 0 && y == 0){
            setTemplateWithSize(img, amount_part_x,0,amount_part_y,0,
                    this.canvas.width/2, this.canvas.height/3, 2, 2,
                    dropX, dropY);
        }else if( x == 1 && y == 1){
            setTemplateWithSize(img, amount_part_x,this.canvas.width/2,amount_part_y,this.canvas.height/3,
                    this.canvas.width/2, this.canvas.height/3, 2, 2,
                    dropX - this.canvas.width/2, dropY - this.canvas.height/3);
        }else if( x == 0 && y == 2){
            setTemplateWithSize(img, amount_part_x,0,amount_part_y,this.canvas.height/2,
                    this.canvas.width/2, this.canvas.height/3, 2, 2,
                    dropX, dropY - this.canvas.height/2);
        }else{
            var x_pos = getPosition(this.canvas.width, amount_part_x, x);
            var y_pos = getPosition(this.canvas.height, amount_part_y, y);
            setImageOnCanvas(img, y_pos, x_pos,
                    (this.canvas.height/img.height)/amount_part_y, (this.canvas.width/img.width)/amount_part_x);
        }
    }

    function setTemplateWithSize(img, amount_part_x_old,x1,amount_part_y_old, y1,
                                 sizeX, sizeY, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(sizeX, amount_part_x, dropX);
        var y = getCoordinate(sizeY, amount_part_y, dropY);
        var x_pos = getPosition(sizeX, amount_part_x, x) + x1;
//        var x_pos = getPosition(sizeX, amount_part_x, x);
//        var y_pos = getPosition(sizeY, amount_part_y, y);
        var y_pos = getPosition(sizeY, amount_part_y, y) + y1;
        setImageOnCanvas(img, y_pos, x_pos,
                (sizeY/img.height)/amount_part_y, (sizeX/img.width)/amount_part_x);
    }

    function setTemplate(img, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(this.canvas.width, amount_part_x, dropX);
        var y = getCoordinate(this.canvas.height, amount_part_y, dropY);
        var x_pos = getPosition(this.canvas.width, amount_part_x, x);
        var y_pos = getPosition(this.canvas.height, amount_part_y, y);
        setImageOnCanvas(img, y_pos, x_pos,
                (this.canvas.height/img.height)/amount_part_y, (this.canvas.width/img.width)/amount_part_x);
    }

    function getPosition(fullSize, amount_part, coordinate){
        return ((1/amount_part)/2)*fullSize + (1/amount_part)* coordinate * fullSize;
    }

    function getCoordinate(fullSize, amount_part, dropCoordinate){
        var coordinate;
        for(var i = 0; i<=amount_part; i++){
            if (dropCoordinate >= fullSize * i/amount_part
                && dropCoordinate < fullSize * (i+1)/amount_part){
                coordinate = i;
            }
        }
        return coordinate;
    }


    function setImageOnCanvas(img, top, left, scaleY, scaleX){
        img.setTop(top);
        img.setLeft(left);
//        img.scale(scaleY)
        img.setScaleY(scaleY);
        img.setScaleX(scaleX);
        this.canvas.calcOffset();
        this.canvas.renderAll();
    }
}