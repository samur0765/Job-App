import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./input";
import styles from "./form.module.scss";
import { statusOptions, typeOptions } from "../../utils/constant";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { createJob, updateJob } from "../../redux/slices/jobSlice";
import { toast } from "react-toastify";

const Form = () => {
  const { mode } = useParams();
  const [editItem, setEditItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //oluşturma modunda:fonksiyon dursun
    if (mode === "create") return setEditItem(null);

    //güncelleme modunda :güncellenecek elemanlarını id al
    api.get(`/jobs/${mode}`).then((res) => {
      setEditItem(res.data);
      setSelectedStatus(res.data.status);
    });
  }, [mode]);

  //Form gönderilince
  const handleSubmit = (e) => {
    //Sayfa yenilenmesini engelle
    e.preventDefault();

    //Formdaki verileri bir nesne içerisinde kaydet
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    if (!editItem) {
      //Api yeni başvuru oluşturmak için istek at
      api
        .post("/jobs", jobData)
        .then((res) => {
          //reducer'a haber ver
          dispatch(createJob(res.data));
          //kullanıcıyı başvurular sayfasına yönlendir
          navigate("/");
          //bildirim gönder
          toast.success("Yeni başvuru oluşturuldu");
        })
        .catch(() => {
          toast.error("Başvuru oluşturulmadı");
        });
    } else {
      //api'a başvuru güncellemek için istek at
      api
        .patch(`/jobs/${editItem.id}`, jobData)
        .then((res) => {
          dispatch(updateJob(res.data));
          //kullanıcıyı başvurular sayfasına yönlendir
          navigate("/");
          //bildirim gönder
          toast.success("Başvuru güncellendi");
        })
        .catch(() => {
          toast.error("Güncelleme başarısız..");
        });
    }
  };

  const dateName =
    selectedStatus === "Mülakat"
      ? "interview_date"
      : selectedStatus === "Reddedildi"
      ? "rejection_date"
      : "date";

  const dateValue =
    editItem &&
    new Date(editItem[dateName])
      .toISOString()
      .slice(0, editItem.status === "Mülakat" ? 16 : 10);
  return (
    <div className={styles.formPage}>
      <section>
        <h2>{editItem ? "Başvuruyu Güncelle" : "Yeni Başvuru Oluştur"}</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" value={editItem?.position} />
          <Input label="Şirket" name="company" value={editItem?.company} />
          <Input label="Lokasyon" name="location" value={editItem?.location} />
          <Input
            label="Durum"
            name="status"
            options={statusOptions}
            handleChange={(e) => setSelectedStatus(e.target.value)}
            value={editItem?.status}
          />
          <Input
            label="Tür"
            name="type"
            options={typeOptions}
            value={editItem?.type}
          />
          <Input
            label={
              selectedStatus === "Mülakat"
                ? "Mülakat Tarihi"
                : selectedStatus === "Reddedildi"
                ? "Reddilme Tarihi"
                : "Başvuru Tarihi"
            }
            name={dateName}
            type={selectedStatus === "Mülakat" ? "datetime-local" : "date"}
            value={dateValue}
          />

          <div className={styles.btnWrapper}>
            <button>{editItem ? "Kaydet" : "Oluştur"}</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
