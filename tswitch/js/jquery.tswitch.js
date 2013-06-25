/**
 * jQuery tswitch Widget
 *
 * Author: Tommy Groshong
 * Create Datetime: 6/21/13 - 1:32 PM
 *
 * Licensed under the MIT XFree86 License
 *    http://www.xfree86.org/current/LICENSE4.html
 *
 * ========================================================== */

(function( $ ) {
    $.widget( "tagjr.tswitch", {

        options: {
            imagePath: 'tswitch/img/',
            size: 'auto',
            flippedOn: true
        },

        _defaultSizingOptions: {
            onImage: 'tswitch_container_on.png',
            offImage: 'tswitch_container_off.png',
            switchImage: 'tswitch_default.png',
            switchHeight: 27,
            switchWidth: 94,
            switchDistance: -53
        },

        _altSizingOptions: {
            onImage: "tswitch_container_on_small.png",
            offImage: "tswitch_container_off_small.png",
            switchImage: "tswitch_small.png",
            switchHeight: 14,
            switchWidth: 47,
            switchDistance: -27
        },
        _size: null,

        _create: function() {
            var self = this;

            if(this.options.size == "auto"){
                $.extend(self.options, self._defaultSizingOptions);
            }else{
                $.extend(self.options, self._altSizingOptions);
            }

            self.options.offImage = self.options.imagePath + self.options.offImage;
            self.options.switchImage = self.options.imagePath + self.options.switchImage;
            self.options.onImage = self.options.imagePath + self.options.onImage;

            var container = $("<div />");
            container.addClass("tswitchContainer");
            container.css("height", self.options.switchHeight + "px");
            container.css("width", self.options.switchWidth + "px");
            container.css("position", "relative");
            container.css("overflow", "hidden");

            var image = $("<img />");
            image.addClass("tswitch");
            image.css("height", self.options.switchHeight + "px");
            image.css("width", self.options.switchWidth + "px");
            image.css("background-image", "url(" + self.options.switchImage + ")");
            image.css("background-repeat", "none");
            image.css("background-position", (self.options.flippedOn)? "0px" : self.options.switchDistance+"px");
            image.attr("src", (self.options.flippedOn)? self.options.onImage : self.options.offImage);

            self.element.html($(container).html($(image)));
            self.element.css("cursor", "pointer");

            // click handling
            self.element.off("click.tswitch").on("click.tswitch", function(event) {
                self.flip();
                self._trigger( self.options.flippedOn ? "flippedoff" : "flippedon", event);

            });

        },

        flip: function() {
            if(this.options.flippedOn){
                this.switchOff();
            }else{
                this.switchOn();
            }
        },

        switchOn: function() {
            var self = this;
            if(self.options.flippedOn){
                return;
            }
            this.element.find('.tswitch').animate(
                {backgroundPosition: 0},
                "slow",
                function() {
                    $(this).attr('src', self.options.onImage);
                    self.options.flippedOn = true;
                }
            );
            //trigger callback event
            self._trigger( "oncomplete", null);
        },

        switchOff: function() {
            var self = this;
            if(!self.options.flippedOn){
                return;
            }
            self.element.find('.tswitch').animate(
                {backgroundPosition: self.options.switchDistance},
                "slow",
                function() {
                    $(this).attr('src',self.options.offImage);
                    self.options.flippedOn = false;
                }
            );
            //trigger callback event
            self._trigger( "offcomplete", null);
        },


        destroy: function() {
            this.element.empty();
            // Call the base destroy function.
            $.Widget.prototype.destroy.call( this );
        }

    });
})( jQuery );