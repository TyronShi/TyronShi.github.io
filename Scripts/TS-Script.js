$(function() {

    //event listener for #ToTop and #MenuLogo click (Home Page Only)
    $("#HomeBody #MenuLogo, #HomeBody #ToTop").on("click", () => {

      //remove scroll snap on #PageContent by setting css style to none
      //this will prevent scroll snapping during animation for smooth look
      $("#PageContent").css("scroll-snap-type", "none");

      //set scroll animation destination to page top at 0px
      $("#PageContent").stop().animate(
        { scrollTop: "0px" },
        1500,

        //callback to add scroll snapping back when animation is done
        //this will let page snap as usual when not running animation
        () => $("#PageContent").css("scroll-snap-type", "y mandatory")

      );
    });

    //event listener for #ToTop and #MenuLogo click (Inner Pages Only)
    $("#InnerBody #MenuLogo, #InnerBody #ToTop").on("click", () => {

      $("#PageContent").css("scroll-snap-type", "none");

      $("#PageContent").stop().animate(
        { scrollTop: "0px" },
        1500,

        () => $("#PageContent").css("scroll-snap-type", "y proximity")

      );
    });

    $("#HomeBody .Work").on("click", () => {
      //set HomeDiv variable to find single #PageContent section height
      let HomeDiv = $("#Page0").height();

      $("#PageContent").css("scroll-snap-type", "none");
      //set scroll animation destination to top of next section by making page scroll height of first section
      $("#PageContent").stop().animate(
        { scrollTop: HomeDiv },
        1000,
        () => $("#PageContent").css("scroll-snap-type", "y mandatory")
      );
    });

    $("#HomeBody .Contact").on("click", () => {
      let HomeDiv = $("#Page0").height();
      //find end section location by multiplying height of first section by total number of sections
      let EndSection = HomeDiv * 7;

      $("#PageContent").css("scroll-snap-type", "none");
    
      $("#PageContent").stop().animate(
        { scrollTop: EndSection },
        2000,
        () => $("#PageContent").css("scroll-snap-type", "y mandatory")
      );
    });
    
    //event listner for scrolling on #PageContent
    $("#PageContent").scroll(function(){
        
        let Scrolled = $("#PageContent").scrollTop()

        //get height of home div
        let HomeDivHeight = $("#PageContent div").height();

        //subtract 3% of home div to find top with margin offset
        let HomeTop = HomeDivHeight * (1 - 0.03);

        //subtract 50% of home div to find middle
        let HomeMid = HomeDivHeight * (1 - 0.50);

        //subtract 97% of home div to find bottom with margin offset
        let HomeBottom = HomeDivHeight * (1 - 0.97);

        //get location of end section top
        //multiplying homediv height by # of sections - 1 section + homebottom
        let EndSectionTop = HomeDivHeight * 6 + HomeTop;

        //get location of end section bottom
        //multiplying homediv height by # of sections - 1 section + homebottom
        let EndSectionBottom = HomeDivHeight * 6 + HomeBottom;
        
        //if else statement to fadein top nav (#MainMenu) when scrolled off middle of home section
        //breakpoint = home section middle
        if (Scrolled > HomeMid) {
          $("#HomeBody #MainMenu").fadeIn(200);
        } else {
          $("#HomeBody #MainMenu").fadeOut(200);
        }

        //if else statement to fadein footer (#BottomMenu) when scrolled off top of home section
        //breakpoint = home section bottom
        if (Scrolled > HomeBottom) {
          $("#HomeBody #BottomMenu ul li, #InnerBody #ToTop").fadeIn(200);
        } else {
          $("#HomeBody #BottomMenu ul li, #InnerBody #ToTop").fadeOut(200);
        }

        //if else statement to change menu blend mode when scrolling between home and end sections
        //breakpoint = section top
        if (Scrolled > HomeTop && Scrolled < EndSectionTop) {
          $("#HomeBody #MainMenu, #HomeBody #SideMenu").css("mix-blend-mode", "exclusion");
        } else {
          $("#HomeBody #MainMenu, #HomeBody #SideMenu").css("mix-blend-mode", "normal");
        }
        //if else statement to change menu blend mode when scrolling between home and end sections
        //breakpoint = section bottom
        if (Scrolled > HomeBottom && Scrolled < EndSectionBottom) {
          $("#HomeBody #BottomMenu").css("mix-blend-mode", "exclusion");
        } else {
          $("#HomeBody #BottomMenu").css("mix-blend-mode", "normal");
        }
        
        //if else statement to make "work" link show hovered state during work section visible
        //breakpoint = home section top
        //breakpoint = end section top
        if (Scrolled > HomeTop && Scrolled < EndSectionTop) {
          $("#HomeBody .Work a").addClass("HoverActiveUnderline");
        } else {
          $("#HomeBody .Work a").removeClass("HoverActiveUnderline");
        }
        //if else statement to make "contact" link show hovered state during contact section visible
        //breakpoint = end section top
        if (Scrolled > EndSectionTop) {
          $("#HomeBody .Contact a").addClass("HoverActiveUnderline");
        } else {
          $("#HomeBody .Contact a").removeClass("HoverActiveUnderline");
        }
    });
});