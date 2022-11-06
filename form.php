<div id = "formCerceve" class="formCerceve">
    <div id="veri_analiz_formu" name="veri_analiz_formu" method="post">
        <div class="mb-5 row">
            <div class="col">
                <label>Gözlem Yerinin Enlemi</label>
                <input type="number" required maxlength="50" class="form-control" id="gozlem_yeri_enlem" name="gozlem_yeri_enlem" placeholder="">
            </div>
            <div class="col">
                <label>Gözlem Yerinin Boylamı</label>
                <input type="number" required maxlength="50" class="form-control" id="gozlem_yeri_boylam" name="gozlem_yeri_boylam" placeholder="">
            </div>
        </div>
        <div class="mb-5 row">
            <div class="col">
                <label for="email_addr">Gözlenen Yıldızın Enlemi</label>
                <input type="number" required maxlength="50" class="form-control" id="gozlenen_yildiz_enlem" name="gozlenen_yildiz_enlem" placeholder="">
            </div>
            <div class="col">
                <label for="phone_input">Gözlem Başlangıç Tarihi</label>
                <input type="date" required maxlength="50" class="form-control" id="gozlem_baslangic_tarihi" name="gozlem_baslangic_tarihi">
            </div>
        </div>
        <div class="mb-5">
            <label for="message">Ölçüm Verileri</label>
            <textarea class="form-control" id="gozlem_verileri" name="gozlem_verileri" rows="10"></textarea>
        </div>
        <button id="gozlem_analiz_dugmesi" name="gozlem_analiz_dugmesi" class="btn btn-primary px-4 btn-lg">Verileri Çözümle</button>
    </div>
</div>