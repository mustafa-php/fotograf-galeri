$(document).ready(function () {

    $(".resimler img").click(function () {
        var sira_numarasi = $(".resimler img").index(this);
        var resim_alan = document.createElement("div");
        var resim = document.createElement("img");
        var cikis = document.createElement("button");
        var cikis_ikon = document.createElement("img");
        var sonraki_button = document.createElement("button");
        var onceki_button = document.createElement("button");
        var resim_sil_button = document.createElement("button");

        resim_alan.className = "resim-alan";
        resim.src = $(this).attr("src");
        cikis_ikon.src = "x.svg";
        $(cikis).addClass("cikis-button");
        $(sonraki_button).addClass("sonraki-button");
        $(onceki_button).addClass("onceki-button");
        $(resim_sil_button).addClass("resim-sil-button");

        $(sonraki_button).html('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">  <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/></svg>');
        $(onceki_button).html('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">  <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/></svg>');
        $(resim_sil_button).html('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>');
        cikis.append(cikis_ikon);

        resim_alan.append(resim, cikis, sonraki_button, onceki_button, resim_sil_button);
        $("body").append(resim_alan);

        $(".cikis-button").click(function () {
            $(".resim-alan").remove();
        });

        $(".onceki-button").click(function () {
            if (sira_numarasi > 0) {
                sira_numarasi--;
                resim.src = $(".resimler img").eq(sira_numarasi).attr("src");
            }
        });

        $(".sonraki-button").click(function () {
            if (sira_numarasi <= $(".resimler img").length - 2) {
                sira_numarasi++;
                resim.src = $(".resimler img").eq(sira_numarasi).attr("src");
            }
        });

        $(resim_sil_button).click(function () {
            $.ajax({
                type: "POST",
                url: document.URL,
                data: {
                    sil: {
                        dosya_ismi: $(".resim-alan img").attr("src"),
                    }
                },
                success: function (data) {
                    window.location = document.URL;
                },
            });
        });
    });


    $(".resim-ekle").click(function () {
        var pencere = document.createElement("div");
        var resim_ekle_alan = document.createElement("div");
        var resim_ekle_kutu = document.createElement("div");
        var resim_sec_button = document.createElement("button");
        var resim_ekle_baslik = document.createElement("div");
        var resim_ekle_iptal = document.createElement("button");
        var resim_onizleme_kutu = document.createElement("div");

        var klasorler = document.createElement("select");
        var resim_ekle_onay = document.createElement("button");
        var resim_ekle_vazgec = document.createElement("button");

        $(pencere).addClass("pencere");
        $(resim_ekle_alan).addClass("resim-ekle-alan");
        $(resim_ekle_kutu).addClass("resim-ekle-kutu");
        $(resim_sec_button).addClass("resim-sec-button btn btn-success");
        $(resim_ekle_iptal).addClass("iptal-button btn btn-danger");
        $(resim_ekle_baslik).addClass("resim-ekle-baslik");
        $(resim_ekle_baslik).html("Resim Ekle");
        $(resim_sec_button).html("Resim Seç");
        $(resim_ekle_iptal).html("İptal");

        resim_ekle_kutu.append(resim_ekle_baslik, resim_sec_button, resim_ekle_iptal)
        resim_ekle_alan.append(pencere, resim_ekle_kutu);

        $("body").append(resim_ekle_alan);

        $(document).on("click", ".resim-ekle-vazgec, .iptal-button", function () {
            $(".resim-ekle-alan").remove();
        });

        $(resim_sec_button).click(function () {
            $("#resim").click();

            $("#resim").change(function () {
                $(resim_ekle_kutu).html("");

                var formData = new FormData();

                var forms = document.getElementById("resim");

                console.log(forms.files.length);

                for (let index = 0; index < forms.files.length; index++) {
                    formData.append("resim[]", document.getElementById("resim").files[index]);
                }

                Array.prototype.forEach.call(this.files, function (filess) {
                    if (filess.type.indexOf('image/' === 0)) {
                        var i = new Image();
                        i.src = URL.createObjectURL(filess);
                        i.className = "resimonizleme";
                        $(resim_onizleme_kutu).append(i)
                    }
                });

                $(resim_onizleme_kutu).addClass("resim-onizleme-kutu");
                $(resim_ekle_onay).addClass("resim-ekle-onay btn btn-success");
                $(resim_ekle_vazgec).addClass("resim-ekle-vazgec btn btn-danger");

                $(resim_ekle_onay).text("Onay");
                $(resim_ekle_vazgec).text("Vazgeç");
                $(resim_ekle_kutu).append(resim_onizleme_kutu, resim_ekle_onay, resim_ekle_vazgec);

                $(resim_ekle_onay).click(function (e) {

                    $.ajax({
                        type: 'POST',
                        url: document.URL,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {

                            console.log(formData.getAll("resim[]"));
                            window.location = document.URL;
                        },
                        error: function (data) {
                            console.log("error");
                        }
                    });
                });
            });
        });
    });

    $(".klasor-ekle").click(function () {

        var pencere = document.createElement("div");
        var klasor_ekle_alan = document.createElement("div");
        var klasor_ekle_kutu = document.createElement("div");
        var klasor_ekle_baslik = document.createElement("div")
        var klasor_isim_alan = document.createElement("input");
        var klasor_ekle_onay = document.createElement("button");
        var klasor_ekle_iptal = document.createElement("button");

        $(pencere).addClass("pencere");
        $(klasor_ekle_alan).addClass("klasor-ekle-alan");
        $(klasor_ekle_kutu).addClass("klasor-ekle-kutu");
        $(klasor_ekle_baslik).addClass("klasor_ekle_baslik");
        $(klasor_ekle_baslik).text("Klasör Oluştur");
        $(klasor_isim_alan).addClass("klasor-isim-alan");
        $(klasor_ekle_onay).addClass("klasor-ekle-onay btn btn-success");
        $(klasor_ekle_onay).text("Onay");
        $(klasor_ekle_iptal).addClass("klasor-ekle-iptal btn btn-danger");
        $(klasor_ekle_iptal).text("Vazgeç");

        $(klasor_ekle_alan).append(pencere, klasor_ekle_kutu);
        $(klasor_ekle_kutu).append(klasor_ekle_baslik, klasor_isim_alan, klasor_ekle_onay, klasor_ekle_iptal);
        document.body.append(klasor_ekle_alan);

        $(klasor_ekle_onay).click(function () {
            var klasor = document.createElement("div");
            var klasor_grid = document.createElement("div");
            var klasor_isim = document.createElement("div");
            $(klasor).addClass("container klasor");
            $(klasor_grid).addClass("row");
            $(klasor_isim).addClass("klasor-isim");
            $(klasor).append(klasor_grid, klasor_isim);
            $(klasor_isim).text(klasor_isim_alan.value);

            var veriler = {
                klasor: true,
                klasor_isim: klasor_isim_alan.value
            }

            $.ajax({
                type: 'POST',
                url: "http://localhost/örnekler/galeri/",
                data: {
                    klasor: veriler
                },
            });
        });

        $(klasor_ekle_iptal).click(function () {
            $(klasor_ekle_alan).remove();
        });

        $(klasor_ekle_onay).click(function () {
            window.location = document.URL;
        });
    });

    $(".klasor").click(function () {
        window.location = "?klasor=" + $(this).attr("yol");
    });
});