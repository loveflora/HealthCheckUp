import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dataState } from "../../Store/list";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import BST1 from "../../Icons/BST1.png";
import BST2 from "../../Icons/BST2.png";
import BST3 from "../../Icons/BST3.png";

import styles from "../../Styles/BSTResult2.module.css";

// 결과별로 알맞는 개선점을 제안하고 싶음

// 저혈당 : 70mg/dL미만
// 정상 : 70~100mg/dL 미만
// 조절필요 : 100 ~ 125mg/dL 미만
// 관리필요 : 125mg/dL 이상

// 조절필요 : 140 ~ 200mg/dL 미만 관리필요 : 200mg/dL 이상

export default function BSTResult1() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useRecoilState(dataState);
  const [meal, setMeal] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  function result() {
    if (inputData.BST < 70) {
      return "저혈당";
    } else if (inputData.BST < 100) {
      return "정상";
    } else if (inputData.BST < 125) {
      return "조절 필요";
    } else if (inputData.BST >= 125) {
      return "관리 필요";
    } else {
      return false;
    }
  }

  return (
    <container className={styles.container}>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <Link to="/BST" className={styles.link}>
            <li className={styles.li}>Result</li>
          </Link>
          <Link to="/BSTInfo" className={styles.link}>
            <li className={styles.li}>당뇨병이란 ?</li>
          </Link>
          <Link to="/BSTSuggest" className={styles.link}>
            <li className={styles.li}>예방하려면 ?</li>
          </Link>
        </nav>
        <div className={styles.header}>
          <div className={styles.BST}>
            <img
              className={styles.img}
              src={BST1}
              alt="BST1"
              width="70"
              height="50"
            />
            <p className={styles.title}>공복 혈당 </p>
            <input
              className={styles.radio}
              type="radio"
              value={meal}
              name="meal"
            />
          </div>
          <br />
          <img
            className={styles.img}
            src={BST2}
            alt="BST2"
            width="70"
            height="50"
          />
          <p className={styles.title}> 식후 혈당 </p>
          <input
            className={styles.radio}
            type="radio"
            value={meal}
            name="meal"
          />
          <br />
          <input
            className={styles.input}
            type="number"
            value={inputData.BST}
            name="BST"
            placeholder="혈당을 입력해주세요"
            onChange={onChange}
          />
        </div>
        <button
          className={styles.btn}
          onClick={(e) => {
            navigate("/BST/Result1");
          }}
        >
          결과 보기
        </button>
        <div className={styles.div}>
          <p className={styles.result}>
            {inputData.name} 님은
            <span className={styles.span}> '{result()}' </span>입니다.
          </p>
        </div>
      </main>
    </container>
  );
}
