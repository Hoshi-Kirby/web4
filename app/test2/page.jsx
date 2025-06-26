"use client";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./../../firebase"; // firebase.jsからdbをインポート

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const page = () => {
  const DEFAULT_USERS = [
    {
      id: 1,
      name: "Yuito",
      content: "こんにちは！掲示板です。",
      time: "2025-06-24 10:30",
    },
    {
      id: 2,
      name: "Taro",
      content: "プログラミング楽しいですね！",
      time: "2025-06-24 11:00",
    },
    {
      id: 3,
      name: "Hoshi☆",
      content: "マリカds神げー",
      time: "2025-06-24 10:21",
    },
  ];
  // Firestoreからデータを取得する関数
  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const [posts, setPosts] = useState(DEFAULT_USERS);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newHai, setNewHai] = useState("何のよーなのよー");
  const [newHaii, setNewHaii] = useState("どこかに何かを人力");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeee = (e) => {
    setNewContent(e.target.value);
  };
  const addPost = async () => {
    if (newName.trim() && newContent.trim()) {
      const docRef = await addDoc(collection(db, "posts"), {
        id: Date.now(),
        name: newName,
        time: new Date().toLocaleString("ja-JP"),
        content: newContent,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);

      // 入力欄をクリア
      setNewName("");
      setNewContent("");
      fetchPosts();
    }
  };
  //   const addPost = async () => {
  //     if (newName.trim() && newContent.trim()) {
  //       const docRef = await addDoc(collection(db, "posts"), {
  //         id: Date.now(),
  //         name: newName,
  //         time: new Date().toLocaleString("ja-JP"),
  //         content: newContent,
  //       });
  //       console.log("Document written with ID: ", docRef.id);

  //       // 入力欄をクリア
  //       setNewName("");
  //       setNewContent("");
  //       setNewHai("何のよーなのよー");
  //       setNewHaii("どこかに何かを人力");
  //     } else {
  //       setNewHai("何か入力してください");
  //       setNewHaii("何か入力してください");
  //     }
  //   };

  const deletePost = (id) => {
    console.log(id);

    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>掲示バーン</h1>
      <div className={styles.flexBoxColumn}>
        <input
          type="text"
          placeholder={newHaii}
          onChange={handleChange}
          value={newName}
        />
        <textarea
          type="text"
          placeholder={newHai}
          onChange={handleChangeee}
          value={newContent}
        />
        <button onClick={addPost}>でたー</button>
      </div>
      <div className={styles.postsList}>
        <h3 className={styles.postsTitle}>投稿一覧</h3>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={styles.postHeader}>
              <strong className={styles.postName}>{post.name}</strong>
              <small className={styles.postTime}>{post.time}</small>
            </div>
            <p className={styles.postContent}>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
