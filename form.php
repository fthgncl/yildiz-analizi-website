<div class="formCerceve">
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
                <input type="number" required maxlength="50" class="form-control" id="gozlenen_enlem" name="gozlenen_enlem" placeholder="">
            </div>
            <div class="col">
                <label for="phone_input">Gözlem Başlangıç Tarihi</label>
                <input type="date" required maxlength="50" class="form-control" id="gozlem_baslangic_Tarihi" name="gozlem_baslangic_Tarihi">
            </div>
        </div>
        <div class="mb-5">
            <label for="message">Ölçüm Verileri</label>
            <textarea class="form-control" id="gozlem_verileri" name="gozlem_verileri" rows="10"></textarea>
        </div>
        <button type="submit" class="btn btn-primary px-4 btn-lg">Verileri Çözümle</button>
    </div>
</div>