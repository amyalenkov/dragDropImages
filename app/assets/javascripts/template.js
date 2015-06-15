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
        }else if(this.templateName == 'template7'){
            setTemplate7(img, 4, 4, dropX, dropY)
        }else if(this.templateName == 'template8'){
            setTemplate8(img, 4, 3, dropX, dropY)
        }
    };

    function setTemplate8(img, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(canvas.width, amount_part_x, dropX);
        var y = getCoordinate(canvas.height, amount_part_y, dropY);
        var y_pos = getPosition(canvas.height, amount_part_y, y);
        var x_pos;
        if(y == 0){
            if(x == 0 || x == 1 || x == 2){
                setImageOnCanvas(img, canvas.height/6, canvas.width*(3/8),
                        (canvas.height/img.height)/3, (canvas.width/img.width)*(3/4));
            }else{
                x_pos = getPosition(canvas.width, amount_part_x, x);
                setImageOnCanvas(img, y_pos, x_pos,
                        (canvas.height/img.height)/amount_part_y,
                        (canvas.width/img.width)/amount_part_x);
            }
        }else if(y == 1){
            x = getCoordinate(canvas.width, 2, dropX);
            x_pos = getPosition(canvas.width, 2, x);
            setImageOnCanvas(img, y_pos, x_pos,
                    (canvas.height/img.height)/amount_part_y,
                    (canvas.width/img.width)/2);
        }else if(y == 2){
            if(x == 1 || x == 2 || x == 3){
                setImageOnCanvas(img, canvas.height*(5/6), canvas.width*(5/8),
                        (canvas.height/img.height)/3, (canvas.width/img.width)*(3/4));
            }else{
                x_pos = getPosition(canvas.width, amount_part_x, x);
                setImageOnCanvas(img, y_pos, x_pos,
                        (canvas.height/img.height)/amount_part_y,
                        (canvas.width/img.width)/amount_part_x);
            }
        }
    }

    function setTemplate3(img, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(canvas.width, amount_part_x, dropX);
        var y = getCoordinate(canvas.height, amount_part_y, dropY);
        if(x == 0 && y == 0){
            setTemplateWithSize(img, 0,0,
                    canvas.width/2, canvas.height/3, 2, 2,
                    dropX, dropY);
        }else if( x == 1 && y == 1){
            setTemplateWithSize(img, canvas.width/2,canvas.height/3,
                    canvas.width/2, canvas.height/3, 2, 2,
                    dropX - canvas.width/2, dropY - canvas.height/3);
        }else if( x == 0 && y == 2){
            setTemplateWithSize(img, 0,canvas.height/2,
                    canvas.width/2, canvas.height/3, 2, 2,
                    dropX, dropY - canvas.height/2);
        }else{
            var x_pos = getPosition(canvas.width, amount_part_x, x);
            var y_pos = getPosition(canvas.height, amount_part_y, y);
            setImageOnCanvas(img, y_pos, x_pos,
                    (canvas.height/img.height)/amount_part_y, (canvas.width/img.width)/amount_part_x);
        }
    }

    function setTemplate7(img, amount_part_x, amount_part_y, dropX, dropY) {
        var x = getCoordinate(canvas.width, amount_part_x, dropX);
        var y = getCoordinate(canvas.height, amount_part_y, dropY);
        if ((x == 1 || x == 2) && (y == 1 || y == 2)) {
            setImageOnCanvas(img, canvas.height/2, canvas.width/2,
                    (canvas.height/img.height)/2, (canvas.width/img.width)/2);
        }else{
            var x_pos = getPosition(canvas.width, amount_part_x, x);
            var y_pos = getPosition(canvas.height, amount_part_y, y);
            setImageOnCanvas(img, y_pos, x_pos,
                    (canvas.height/img.height)/amount_part_y, (canvas.width/img.width)/amount_part_x);
        }
    }

    function setTemplateWithSize(img, x1,y1,
                                 sizeX, sizeY, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(sizeX, amount_part_x, dropX);
        var y = getCoordinate(sizeY, amount_part_y, dropY);
        var x_pos = getPosition(sizeX, amount_part_x, x) + x1;
        var y_pos = getPosition(sizeY, amount_part_y, y) + y1;
        setImageOnCanvas(img, y_pos, x_pos,
                (sizeY/img.height)/amount_part_y, (sizeX/img.width)/amount_part_x);
    }

    function setTemplate(img, amount_part_x, amount_part_y, dropX, dropY){
        var x = getCoordinate(canvas.width, amount_part_x, dropX);
        var y = getCoordinate(canvas.height, amount_part_y, dropY);
        var x_pos = getPosition(canvas.width, amount_part_x, x);
        var y_pos = getPosition(canvas.height, amount_part_y, y);
        setImageOnCanvas(img, y_pos, x_pos,
                (canvas.height/img.height)/amount_part_y, (canvas.width/img.width)/amount_part_x);
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
//        img.setScaleX(scaleX);
        canvas.calcOffset();
        canvas.renderAll();
    }
}