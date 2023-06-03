<!doctype html>
<html lang="tr" data-bs-theme="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mustafa Şimşek Galeri Uygulaması</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
</head>

<body>
    <header class="p-1 pb-2 text-center h1 text-white border-bottom border-secondary d-flex align-items-center justify-content-center">
        <div>
            Mustafa Şimşek - Galeri Uygulaması
        </div>
    </header>
    <main class="container">
        <div class="row h-100">
            <section class="col-9 h-100 overflow-auto border-end border-secondary">
                <div class="row justify-content-center resimler">
                    <?php

                    $klasor_isim = (isset($_GET["klasor"])) ? $_GET["klasor"] : "anaklasor";
                    if (is_dir($klasor_isim)) {

                        $klasor = scandir($klasor_isim);
                        foreach ($klasor as $dosya) {
                            if ($dosya == '.' || $dosya == '..') continue;
                            $uzanti = ['png', 'jpg', 'ico'];
                            $ext = strtolower(substr($dosya, strpos($dosya, ".") + 1));
                            if (in_array($ext, $uzanti) == true) {
                    ?>
                                <div class="col-auto"><img src="<?php echo $klasor_isim . "/" . $dosya ?>" class="img-thumbnail" alt=""></div>
                        <?php
                            }
                        }
                    } else {
                        ?>
                        <h1>Klasör Yok</h1>
                    <?php
                    }
                    ?>
                </div>
            </section>
            <section class="col-3">
                <div>
                    <button class="resim-ekle">Resim Ekle</button>
                </div>

                <div>
                    <button class="klasor-ekle">
                        Klasör Ekle
                    </button>
                </div>
                <?php

                $klasorler = scandir(".");

                foreach ($klasorler as $klasor) {
                    if ($klasor == '.' || $klasor == '..') continue;
                    if (is_dir($klasor)) {
                ?>
                        <div class="container klasor" yol="<?php echo $klasor; ?>">
                            <div class=" row">
                                <?php $resimler = scandir($klasor);

                                if (count($resimler) > 2) {
                                    $resimadet = (count($resimler) >= 5) ? 5 : count($resimler);

                                    for ($i = 2; $i < $resimadet; $i++) {

                                        if ($resimler[$i] == '.' || $resimler[$i] == '..') continue;

                                        $uzanti = ['png', 'jpg', 'ico'];
                                        $ext = strtolower(substr($resimler[$i], strpos($resimler[$i], ".") + 1));
                                        if (in_array($ext, $uzanti) == true) { ?>

                                            <div class="col"><img src="<?php echo $klasor . "/" . $resimler[$i]; ?>" class="sablon-img" alt=""></div>
                                <?php

                                        }
                                    }
                                } ?>
                            </div>
                            <div class="klasor-isim"><?php echo $klasor; ?></div>
                        </div>
                <?php
                    }
                }

                ?>
            </section>
        </div>
    </main>
    <form action="" method="post" enctype="multipart/form-data" hidden id="resimler">
        <input type="file" name="resim[]" id="resim" accept=".jpg , .png , .jpeg , .webp" multiple>
    </form>
    <?php
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        if (isset($_FILES["resim"])) {
            $toplamresim = count($_FILES['resim']['name']);
            for ($i = 0; $i < $toplamresim; $i++) {
                $uzanti = (isset($_GET["klasor"])) ? $_GET["klasor"] : "anaklasor";
                $dizin = $uzanti . "/";
                $yuklenecekresim = $dizin . $_FILES["resim"]["name"][$i];
                if (move_uploaded_file($_FILES["resim"]["tmp_name"][$i], $yuklenecekresim)) {
                }
            }
        }
        if (isset($_POST["klasor"])) {
            $klasoradi = $_POST["klasor"]["klasor_isim"];

            if (!file_exists($_POST["klasor"]["klasor_isim"])) {
                mkdir($klasoradi);
            }
        }

        if (isset($_POST["sil"])) {
            if (unlink($_POST["sil"]["dosya_ismi"])) {
                echo "sildi";
            } else {
                echo "silmedi";
            }
        }
    }
    ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>