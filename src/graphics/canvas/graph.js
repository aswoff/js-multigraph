window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    ns.mixin.add(function(ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("doDrag", function(multigraph,bx,by,dx,dy,shiftKey) {
	    //console.log('doDrag: ' + dx + ',' + dy);

	    // find the first horizontal axis
	    var i=0;
	    while (i<this.axes().size()) {
		if (this.axes().at(i).orientation()===window.multigraph.core.Axis.HORIZONTAL) {
		    break;
		}
	    }
	    if (i>=this.axes().size()) {
		console.log("ERROR: can't find horizontal axis for graph");
		return;
	    }
	    var haxis = this.axes().at(i);
	    var adx = dx / haxis.axisToDataRatio();
	    var newMin, newMax;
	    if (shiftKey) {
		var dataBase = haxis.axisValueToDataValue(bx).getRealValue();
		var factor = 10 * Math.abs(dx / (haxis.pixelLength() - haxis.maxoffset() - haxis.minoffset()));
		if (dx <= 0) {
		    newMin = new window.multigraph.core.NumberValue((haxis.dataMin().getRealValue() - dataBase) * ( 1 + factor ) + dataBase);
		    newMax = new window.multigraph.core.NumberValue((haxis.dataMax().getRealValue() - dataBase) * ( 1 + factor ) + dataBase);
		} else {
		    newMin = new window.multigraph.core.NumberValue((haxis.dataMin().getRealValue() - dataBase) * ( 1 - factor ) + dataBase);
		    newMax = new window.multigraph.core.NumberValue((haxis.dataMax().getRealValue() - dataBase) * ( 1 - factor ) + dataBase);
		}
	    } else {
		newMin = new window.multigraph.core.NumberValue( haxis.dataMin().getRealValue() - adx );
		newMax = new window.multigraph.core.NumberValue( haxis.dataMax().getRealValue() - adx );
	    }
	    haxis.dataMin(newMin);
	    haxis.dataMax(newMax);
	    multigraph.redraw();
	});


        Graph.respondsTo("render", function(context, width, height) {
            var i;

/*
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width, height);
            context.moveTo(0, height);
            context.lineTo(width, 0);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
*/

            context.fillStyle = this.window().bordercolor().getHexString("#");
            var m = this.window().margin().left();
            context.fillRect(m,m,width-2*m,height-2*m);

            var mb = m + this.window().border();

            context.fillStyle = this.background().color().getHexString("#");
            context.fillRect(mb,mb,width-2*mb,height-2*mb);

            var x0 = this.window().margin().left()  + this.window().border() + this.window().padding().left() + this.plotarea().margin().left();
            var y0 = this.window().margin().bottom() + this.window().border() + this.window().padding().bottom() + this.plotarea().margin().bottom();

            context.transform(1,0,0,1,x0,y0);

            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).renderGrid(this, context);
            }

            for (i=0; i<this.plots().size(); ++i) {
                this.plots().at(i).render(this, context);
            }

            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, context);
            }

        });

    });

});
