const activity_levels = {
  1: "Not very active",
  2: "Active",
  3: "Very active",
  4: "Pro athlete"
}

$(document).ready(function(){

    $("#dog-age, #dog-activity").val(1).trigger("input")

    $(".menu-toggle").on("click", function(e){
      e.preventDefault();
      $(".mobile-menu").toggleClass("active");
      if($("i", this).hasClass("fa-bars")){
        $("i", this).removeClass("fa-bars");
        $("i", this).addClass("fa-times");
      } else {
        $("i", this).removeClass("fa-times");
        $("i", this).addClass("fa-bars");
      }
    })

    

    $("#zipcode").on("keyup", function(){
      if(!checkZip($(this).val())){
        $("#zip-input").addClass("error")
        $("#zip-input .error-text").text("Sorry, that zip code is not in our delivery range.")
      } else {
        $("#zip-input").removeClass("error")
      }
    });

    $('#dog-age').on('input', function(){
      let age = $("#dog-age").val()
      if (age == 1) {
        $("#age-label").text(`${age} year`)
      } else {
        $("#age-label").text(`${age} years`)
      }
    });

    $("#dog-name").on("keyup", function(){
      if($(this).val() != ""){
        let dog_name = $("#dog-name").val()+"'s"
        $("#dog-name-label").text(dog_name);
      } else {
        $("#dog-name-label").text("Your dog's");
      }
    });

    $("#dog-weight").on('keyup', function(){
      let weight = parseInt($(this).val())
      if(weight <= 0 || weight > 250){
        $("#weight-input").addClass("error");
        $("#weight-input .error-text").text("Invalid weight, please enter a number between 1-250")
      } else {
        $("#weight-input").removeClass("error");
      
        setTimeout(function(){
          var price1 = parseFloat($("#dog-weight").val() * 0.33).toFixed(2);
          var price2 = parseFloat($("#dog-weight").val() * 0.12).toFixed(2);
          var total1 = parseFloat(price1 * 14).toFixed(2);
          var total2 = parseFloat(price2 * 14).toFixed(2);

          $("#price1").text("$"+price1);
          $("#price2").text("$"+price2);
          $("#total1").text("$"+total1);
          $("#total2").text("$"+total2);
        }, 250)

      }
      
    });

    $('#dog-activity').on('input', function(){
      $("#activity-label").text(activity_levels[$("#dog-activity").val()])
    });

    $(".product-feature-nav button").on("click", function(e){
      let target = "#" + $(this).data("for")
      $(".product-feature-nav button").removeClass("active")
      $(this).addClass("active")
      $(".product-features .feature").removeClass("active")
      $(target).addClass("active")
    })

    $('.meal-selector-button').on('click', function(e){
      e.preventDefault();
      $('.meal-selector-button').removeClass("active")
      $(this).toggleClass("active")
      let mealplan = $(this).data("meal-plan")
      $("#meal-selections").data("meal-plan", mealplan)
    });

    $('.meal-icon-toggle').on('click', function(e){
      e.preventDefault();
      $('.meal-icon-toggle').removeClass("active")
      $(this).addClass("active")
    });

    $(".loaf-selector a").on('click', function(e){
      e.preventDefault();
      let section = $(this).data("content")
      console.log(section)
      $(".loaf-content").removeClass("active")
      $(".loaf-slider #"+section).addClass("active")
      $(".loaf-features").removeClass("active")
      $(".loaf-slider #"+section+" .loaf-features:first").addClass("active")
      initSliders();  
    });

    $(".faqs .entry").on("click", function(e){
      $(this).toggleClass("active");
      if($("i", this).hasClass("fa-caret-down")){
        $("i", this).addClass("fa-caret-up");
        $("i", this).removeClass("fa-caret-down");
      } else {
        $("i", this).removeClass("fa-caret-up");
        $("i", this).addClass("fa-caret-down");
      }
    })

    $("#review-carousel").slick({
      slidesToShow: 3,
      prevArrow: $("#carousel-prev"),
      nextArrow: $("#carousel-next"),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
        },
        }
      ]
    });

    $(window).on("scroll", function(){
      if($(window).scrollTop() > 640){
        $(".main-nav").addClass("scrolled");
      } else if($(window).scrollTop() < 300){
        $(".main-nav").removeClass("scrolled");
      }
    });

    // $(".loaf-feature-slider").each(function(){
    //   let featureName = $(this).data("features");
    //   var featureId = 1;
    //   let parent = $(this)
    //   $(".handle", this).on("moved", function(e){
    //     e.stopPropagation();
    //     let progress = parseInt($(this)[0].style.left.replace("%",""));
    //     if(progress < 30){
    //       featureId = 1
    //       $(".loaf-features").not("#"+featureName+"-"+featureId).removeClass("active");
    //       $("#"+featureName+"-"+featureId).not(".active").addClass("active");
    //     } 
    //     if (progress >= 30 && progress < 60){
    //       featureId = 2
    //       $(".loaf-features").not("#"+featureName+"-"+featureId).removeClass("active");
    //       $("#"+featureName+"-"+featureId).not(".active").addClass("active");
    //     } 
    //     if (progress >= 85) {
    //       featureId = 3
    //       $(".loaf-features").not("#"+featureName+"-"+featureId).removeClass("active");
    //       $("#"+featureName+"-"+featureId).not(".active").addClass("active");
    //     }
    //   });
    // })

  });
  

  $(window).resize(function(){
    // initSliders();
  });

  

function initSliders(){
  // $('.ba-slider').each(function(){
  //   var cur = $(this);
  //   var width = cur.width()+'px';
  //   cur.find('.resize img').css('width', width);
  // });
}

function checkZip(zip){
  let zipcodes = ['12345', '97201', '98663'];
  if(zipcodes.includes(zip)){
    return true;
  }
  return false;
}
  
function drags(dragElement, resizeElement, container) {
	
    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {
      
      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');
      
      // Check if it's a mouse or touch event and pass along the correct value
      var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
      
      // Get the initial position
      var dragWidth = dragElement.outerWidth(),
          posX = dragElement.offset().left + dragWidth - startX,
          containerOffset = container.offset().left,
          containerWidth = container.outerWidth();
   
      // Set limits
      minLeft = containerOffset + 10;
      maxLeft = containerOffset + containerWidth - dragWidth - 10;
      
      // Calculate the dragging distance on mousemove.
      dragElement.parents().on("mousemove touchmove", function(e) {
          
        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        leftValue = moveX + posX - dragWidth;
        
        
        // Prevent going off limits
        if ( leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        
        
        // Translate the handle's left value to masked divs width.
        widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
              
        // Set the new values for the slider and the handle. 
        // Bind mouseup events to stop dragging.
        $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });
        $('.resizable').css('width', widthValue);
      }).on('mouseup touchend touchcancel', function(){
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });

    dragElement.on("mousemove touchmove", function(e){
      
      setTimeout(function(){
        dragElement.trigger("moved");
      }, 500);
      return true;
      
    });
    
  }
  
  

// jQuery.event.special.touchstart = {
//   setup: function( _, ns, handle ) {
//       this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
//   }
// };
// jQuery.event.special.touchmove = {
//   setup: function( _, ns, handle ) {
//       this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
//   }
// };
// jQuery.event.special.wheel = {
//   setup: function( _, ns, handle ){
//       this.addEventListener("wheel", handle, { passive: true });
//   }
// };
// jQuery.event.special.mousewheel = {
//   setup: function( _, ns, handle ){
//       this.addEventListener("mousewheel", handle, { passive: true });
//   }
// };