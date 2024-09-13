import React, { useCallback, useMemo, useState } from "react";
import { CompanyProps } from "../../common/utils/types/data-type-definitions";
import CompanyCardWithModal from "../company-card/with-modal/CompanyCardWithModal";
import stylesV0 from "../../common/styles/CompanyListStyles.v0.module.css";
import stylesV1 from "../../common/styles/CompanyListStyles.v1.module.css";
import stylesV2 from "../../common/styles/CompanyListStyles.v2.module.css";

type CompanyListProps = {
  companies: CompanyProps[];
};

const stylesArr = [stylesV0, stylesV1, stylesV2]; // Move outside component to avoid re-creation

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null);
  const [styleSelectedIndex, setStyleSelectedIndex] = useState(2);

  const toggleStyle = useCallback(() => {
    setStyleSelectedIndex((prevIndex) => (prevIndex + 1) % stylesArr.length);
  }, []);

  const styles = useMemo(() => stylesArr[styleSelectedIndex], [styleSelectedIndex]);

  const handleCompanyClick = (company: CompanyProps) => {
    setSelectedCompany(company);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      <button onClick={toggleStyle}>Change Style</button>
      <ul className={styles.companyList}>
        {companies.map((company) => (
          <li key={company.uniqueId} className={styles.companyListItem}>
            <button
              className={styles.companyButton}
              onClick={() => handleCompanyClick(company)}
            >
              {company.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedCompany && (
        <CompanyCardWithModal company={selectedCompany} onClose={closeModal} />
      )}
    </>
  );
};

export default CompanyList;
