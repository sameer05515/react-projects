import React, { useEffect, useState } from "react";
import { CompanyProps } from "../../common/utils/types/data-type-definitions";
import CompanyCardWithModal from "../company-card/with-modal/CompanyCardWithModal";

// Dynamically import styles based on the selected index
const loadStyle = (index: number) => {
  switch (index) {
    case 0:
      return import("../../common/styles/CompanyListStyles.v0.module.css");
    case 1:
      return import("../../common/styles/CompanyListStyles.v1.module.css");
    case 2:
      return import("../../common/styles/CompanyListStyles.v2.module.css");
    default:
      return import("../../common/styles/CompanyListStyles.v0.module.css");
  }
};

type CompanyListProps = {
  companies: CompanyProps[];
};

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null);
  const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);
  const [styles, setStyles] = useState<any>(null);

  useEffect(() => {
    loadStyle(styleSelectedIndex).then((module) => setStyles(module.default));
  }, [styleSelectedIndex]);

  const toggleStyle = () => {
    setStyleSelectedIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      <button onClick={toggleStyle}>Change Style</button>
      <ul className={styles?.companyList}>
        {companies.map((company) => (
          <li key={company.uniqueId} className={styles?.companyListItem}>
            <button className={styles?.companyButton} onClick={() => setSelectedCompany(company)}>
              {company.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedCompany && <CompanyCardWithModal company={selectedCompany} onClose={closeModal}  />}
    </>
  );
};

export default CompanyList;
