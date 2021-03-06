<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Horários Tejo</title>

    <style>
        /* latin */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          src: local('Roboto Light'), local('Roboto-Light'), url(http://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
        }
        /* latin */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v15/CWB0XYA8bzo0kSThX0UTuA.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
        }
        /* latin */
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 500;
          src: local('Roboto Medium'), local('Roboto-Medium'), url(http://fonts.gstatic.com/s/roboto/v15/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
        }
    </style>
    <link rel="stylesheet" href="css/main.css">

    <!-- icons -->
    <link rel="shortcut icon" type="image/png" href="favicon.ico"/>

    <script>

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-57580494-1', 'auto');
      ga('send', 'pageview');

    </script>
</head>

<body>

    <div class="wrapper">
        <div class="page home-page active">
            <header class="page-header">
                <h1 class="page-heading">
                    Horários
                    <span class="bigger">Tejo</span>
                </h1>
            </header>
            <section class="page-content">
                <article class="box" tabindex="0" id="outbound-trip" data-destination="barreiro">
                    <div class="route">
                        <span class="label">De</span>
                        <span class="route-departure">Barreiro</span>
                    </div>
                    <div class="route">
                        <span class="label">Para</span>
                        <span class="route-arrival">Terreiro do Paço</span>
                    </div>

                    <div class="content-box">

                        <div class="countdown" id="outbound-countdown">
                            @@include('includes/countdown.tpl')
                        </div>

                        <div class="next-boat">
                            <span class="label">A próxima partida é às </span>
                            <span id="next-outbound-departure">- -:- -</span>
                        </div>
                        <div class="later-boat">
                            <span class="label">A seguinte é às <span id="later-outbound-departure">- -:- -</span></span>

                        </div>
                    </div>
                </article>

                <article class="box" tabindex="0" id="return-trip" data-destination="terreiro">
                    <div class="route">
                        <span class="label">De</span>
                        <span class="route-departure">Terreiro do Paço</span>
                    </div>
                    <div class="route">
                        <span class="label">Para</span>
                        <span class="route-arrival">Barreiro</span>
                    </div>

                    <div class="content-box">

                        <div class="countdown" id="return-countdown">
                            @@include('includes/countdown.tpl')
                        </div>

                        <div class="next-boat">
                            <span class="label">A próxima partida é às </span>
                            <span id="next-return-departure"></span>
                        </div>
                        <div class="later-boat">
                            <span class="label">A seguinte é às <span id="later-return-departure"></span></span>
                        </div>
                    </div>
                </article>
            </section>
        </div>

        <!-- OUTBOUND -->
        <div class="page schedule-page" id="outbound-schedule">
            <header class="page-header">
                <a role="button" class="back-to-home">
                    <span class="arrow-back"></span>
                </a>
                <h1 class="page-heading">
                    <span>Barreiro</span>
                    <span class="bigger">Terreiro do Paço</span>
                </h1>
            </header>
            <section class="page-content">
                <article class="box schedule-box">
                    <ul class="nav">
                        <li tabindex="0" class="nav-tab active" data-schedule="weekdays-outbound">Dias úteis</li>
                        <li tabindex="0" class="nav-tab" data-schedule="saturdays-outbound">Sábados</li>
                        <li tabindex="0" class="nav-tab" data-schedule="sundays-outbound">Domingos<br>e Feriados</li>
                    </ul>
                    <div class="schedule-wrapper">
                        <div id="weekdays-outbound-schedule" class="schedule active"></div>
                        <div id="saturdays-outbound-schedule" class="schedule"></div>
                        <div id="sundays-outbound-schedule" class="schedule"></div>
                    </div>
                </article>
            </section>
        </div>

        <!-- RETURN -->
        <div class="page schedule-page" id="return-schedule">
            <header class="page-header">
                <a role="button" class="back-to-home">
                    <span class="arrow-back"></span>
                </a>
                <h1 class="page-heading">
                    <span>Terreiro do Paço</span>
                    <span class="bigger">Barreiro</span>
                </h1>
            </header>
            <section class="page-content">
                <article class="box schedule-box">
                    <ul class="nav">
                        <li tabindex="0" class="nav-tab active" data-schedule="weekdays-return">Dias úteis</li>
                        <li tabindex="0" class="nav-tab" data-schedule="saturdays-return">Sábados</li>
                        <li tabindex="0" class="nav-tab" data-schedule="sundays-return">Domingos<br>e Feriados</li>
                    </ul>
                    <div class="schedule-wrapper">
                        <div id="weekdays-return-schedule" class="schedule active"></div>
                        <div id="saturdays-return-schedule" class="schedule"></div>
                        <div id="sundays-return-schedule" class="schedule"></div>
                    </div>
                </article>
            </section>
        </div>
    </div>

    <script src="cordova.js"></script>
    <script src="js/vendor/jquery.min.js"></script>
    <script src="js/index.js"></script>
    <script>
        app.initialize();
    </script>

    <script src="js/vendor/jquery.mobile.custom.min.js"></script> <!-- for swipe -->
    <script src="js/vendor/jquery.countdown.min.js"></script>

    <script src="js/main.js"></script>
    <script src="js/schedule.js"></script>
</body>
</html>
