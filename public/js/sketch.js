sketches = ["tpl/js/vis1.pde", "tpl/js/vis2.pde", "tpl/js/vis3.pde", "tpl/js/vis4.pde", "tpl/js/vis5.pde", "tpl/js/vis6.pde"];
sketchIndex = 0;

// Runs on page load	
$(function() {
    var w, h;
    w = $('#left-sidebar').css('width');
    h = $('#left-sidebar').css('height');
    $("#left-sidebar").prepend('<canvas id="mycanvas" data-processing-sources="tpl/js/vis1.pde" width=' + w + ' height=' + h + '></canvas>');

    $("#next").click(function() {
        sketchIndex ++;
        if (sketchIndex > sketches.length - 1) {sketchIndex = 0;}

        $('#mycanvas').remove();
        var canvasRef = document.createElement('canvas');
        var p = Processing.loadSketchFromSources(canvasRef, [sketches[sketchIndex]]);

        var w, h;
        w = $('#left-sidebar').css('width');
        h = $('#left-sidebar').css('height');

        canvasRef.width = w;
        canvasRef.height = h;
        $(canvasRef).attr('id', 'mycanvas');
        $('#left-sidebar').prepend(canvasRef);
    });

    $(window).resize(function() {
            var tOffset = ($('#left-sidebar').height() / 2) - ($('#container').height() / 2);
            var lOffset = ($('#left-sidebar').width() / 2) - ($('#container').width() / 2);
            $("#container").css('top', tOffset);
            $("#container").css('left', lOffset);
            //console.log(($('#left-sidebar').height() / 2), ($('#container').height() / 2), tOffset);
    });
    $(window).trigger('resize');


    $('#show-sidebar').hide();
    $('#hide-sidebar').click(function() {
        $('#right-sidebar').hide();
        $('#show-sidebar').show();
    });
    $('#show-sidebar').click(function() {
        $('#right-sidebar').show();
        $('#show-sidebar').hide();
    });

    $('#disclaimer-sidebar').hide();
    $('#hide-disclaimer').click(function() {
        $('#disclaimer-sidebar').hide();
        $('#show-disclaimer').show();
    });
    $('#show-disclaimer').click(function() {
        $('#disclaimer-sidebar').show();
        $('#show-disclaimer').hide();
    });
});