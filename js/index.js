$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };
            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            if (typeof callback === 'function') callback();
        });
        return this;
    },
});
$(document).ready(function () {

    $('.moveTo').click(function (e) {
        e.preventDefault;
        if ($(this).hasClass(".active-link") == false) {
            $(".active-link").removeClass("active-link");
            $(this).addClass("active-link")
        }
        let idTo = $(this).data("dest");
        let position = $("#" + idTo).offset().top;
        position -= 50;
        $('html, body').animate({
            scrollTop: position
        }, 'slow');
        return false;
    });

    $(".menuBars").click(function () {
        $(".menuBars").toggleClass("change");
        if (!$(".menu").hasClass("expandMenu")) {
            $(".menu").addClass("expandMenu");
            $(".menu").animateCss("slideInDown", function () {
                if (!$(".menuBars").hasClass("change")) { //Icon is BARS mode?
                    $(".menuBars").toggleClass("change"); //Turn BARS into X
                }
            });
        } else {
            $(".menu").animateCss("slideOutUp", function () {
                $(".menu").removeClass("expandMenu");
                if ($(".menuBars").hasClass("change")) { //Icon is X mode?
                    $(".menuBars").removeClass("change"); //Turn X into BARS
                }
            });
        }
    });

    window.sr = ScrollReveal({
        reset: false,
        delay: 0,
        duration: 700,
        distance: '20%',
        mobile: false
    });
    sr.reveal('.leftReveal', {
        origin: 'left'
    });
    sr.reveal('.rightReveal', {
        origin: 'right'
    });
    sr.reveal('.topReveal', {
        origin: 'top'
    });
    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    });
    sr.reveal('.hexagon', {
        origin: 'right'
    });
    sr.reveal(document.querySelectorAll('.sectionDesc'), {
        origin: 'left'
    });
    var thresholdValues = [];
    for (var i = 0; i <= 1; i += 0.01) {
        thresholdValues.push(parseFloat(i.toFixed(2)));
    }
    var optionsObserver = {
        rootMargin: '0px',
        threshold: thresholdValues
    }

    const io = new IntersectionObserver(entries => {
        for (const entry of entries) {
            let visibleView = Math.floor(($(entry.target).height() * entry.intersectionRatio / $(window).height()) * 100); //Porcentagem que o elemento ocupa na viewport
            let visibleElem = Math.floor(entry.intersectionRatio * 100); //Porcentagem do elemento mostrado na tela, pode ser maior ou menor que a Viewport
            if (entry.isIntersecting && (visibleView >= 50 || visibleElem >= 50)) {
                let menuTarget = "#" + $(entry.target).attr('id') + "Menu";
                if ($(menuTarget).hasClass(".active-link") == false) {
                    $(".active-link").removeClass("active-link");
                    $(menuTarget).addClass("active-link")
                }
            }
        }
    }, optionsObserver);

    document.querySelectorAll('.observe').forEach(elem => io.observe(elem)); //Observa cada elemento

    (function (a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);

    if (jQuery.browser.mobile) {
        $(".menu").removeAttr("data-spy");
        $(".menu").removeAttr("data-offset-top");
        $(".navMobile").css("display", "block");
    }

    $('#contact-form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://www.simuladoenemufv.com.br/sendEmail.php",
            method: "POST",
	    contentType: "application/json; charset=utf-8; Access-Control-Allow-Origin= *",
            data: {
                nome: $("nome#Form").val(),
                email: $("#emailForm").val(),
                mensagem: $("#msgForm").val()
            }
        }).done(function (response) {
            $('#success').addClass('expand');
            $('#success').animateCss('zoomIn');
            $('#contact-form').find("input[type=text], input[type=email], textarea").val("");
        });
    });

    $('#closeSuccess').click(function () {
        $('#success').animateCss("zoomOut",function(){
            $('#success').removeClass('expand');
        });
    })

});

//this is the data to be plotted
var results = [
    {
        date: "Janeiro",
        visits: 234
  },
    {
        date: "Fevereiro",
        visits: 345
  },
    {
        date: "Março",
        visits: 355
  },
    {
        date: "Abril",
        visits: 412
  },
    {
        date: "Maio",
        visits: 435
  },
    {
        date: "Junho",
        visits: 543
  },
    {
        date: "Julho",
        visits: 567
  },
    {
        date: "Agosto",
        visits: 580
  }
];

//this is the function to create the line chart
function drawLineChart(div_id, results, yColumn, yLabel, xAxes, firstColour, secondColour, thirdColour, fourthColour) {
    var ctx = document.getElementById(div_id).getContext("2d");
    var width = window.innerWidth || document.body.clientWidth;
    var gradientStroke = ctx.createLinearGradient(0, 0, width, 0);
    gradientStroke.addColorStop(0, firstColour);
    gradientStroke.addColorStop(0.3, secondColour);
    gradientStroke.addColorStop(0.6, thirdColour);
    gradientStroke.addColorStop(1, fourthColour);

    var labels = results.map(function (item) {
        return item[xAxes];
    });
    var data = results.map(function (item) {
        return item[yColumn];
    });

    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: yLabel,
                    borderColor: gradientStroke,
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    pointBorderWidth: 8,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 4,
                    data: data
        }
      ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: "none"
            },
            scales: {
                yAxes: [{
                    display: false
        }],
                xAxes: [
                    {
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#383838",
                            fontStyle: "bold",
                            fontFamily: "Raleway"
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false,
                            drawBorder: false
                        }
          }
        ]
            }
        }
    });
}


drawLineChart(
    "lineChartPinkOrange",
    results,
    "visits",
    "Número de vendas",
    "date",
    "#F44336",
    "#F50057",
    "#FF4081",
    "#FF9100"
);
