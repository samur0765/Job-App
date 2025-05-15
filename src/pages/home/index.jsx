import React from "react";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import Loader from "../../companents/loader";
import Error from "../../companents/error";
import Card from "../../companents/card";

const Home = () => {
  //Store abone ol
  const { isLoading, error, jobs } = useSelector((store) => store.jobReducer);

  const grouped = jobs.reduce((grouped, job) => {
    //Oluşturduğumuz nesnede status'e karşılık gelen dizi yoksa oluştur
    if (!grouped[job.status]) {
      grouped[job.status] = [];
    }

    //İş'in status değerine karşılık gelen diziye işi pushla
    grouped[job.status].push(job);

    //nsnenin son halini return et
    return grouped;
  }, {});

  if (isLoading)
    return (
      <div className={styles.layout}>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className={styles.layout}>
        <Error message={error} />
      </div>
    );

  console.log(jobs);
  return (
    <div className={styles.layout}>
      <div className={styles.stack}>
        {Object.keys(grouped).map((status) => (
          <div className={styles.group}>
            <h1>{status}</h1>

            <div className={styles.list}>
              {grouped[status].map((job, key) => (
                <Card job={job} key={key} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
