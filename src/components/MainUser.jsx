import React, { useState } from "react";
import SearchingBar from "./SearchingBar";
import { useParams, NavLink } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductsTableUsers } from "./ProductsTableUsers";
import { NavBarUser } from "./NavBarUser";

const MainUser = () => {
  const [modal, setModal] = useState(false);
  const [modalSearchProducts, setModalSearchProducts] = useState(false);
  const [products, setProducts] = useState(null);
  const [term, setTerm] = useState("");

  const { code } = useParams();

  // const handleClose = () => {
  //   setModal(false);
  //   setModalSearchProducts(false);
  // };

  return modal ? (
    <Modal>
      {modalSearchProducts && (
        <div className={"searching-bar-div table-responsive"}>
          <SearchingBar
            term={term}
            setTerm={setTerm}
            setProducts={setProducts}
            setModal={setModal}
            setModalSearchProducts={setModalSearchProducts}
          />
          <ProductsTableUsers
            products={products}
            setProducts={setProducts}
            userCode={code}
            showSearchingBar={false}
          />
        </div>
      )}
    </Modal>
  ) : (
    <div className={"nav-bar"}>
      <NavBarUser code={code} />
      <SearchingBar
        term={term}
        setTerm={setTerm}
        setProducts={setProducts}
        setModal={setModal}
        setModalSearchProducts={setModalSearchProducts}
      />
    </div>
  );
};

export default MainUser;
