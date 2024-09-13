import React from 'react';
import { CompanyProps } from '../../common/utils/types/data-type-definitions';
import styles from '../../common/styles/CompanyCardStyles.v0.module.css';

type CompanyCardProps = {
  company: CompanyProps;
};

const CompanyCardV1_0_0 = ({ company }: CompanyCardProps) => {
  return (
    <div className={styles.companyCard}>
      <h2 className={styles.companyTitle}>{company.name}</h2>
      <p className={styles.companyDetails}>
        <strong>Company ID:</strong> {company.uniqueId}
      </p>
      <p className={styles.companyDetails}>
        <strong>Employee Code:</strong> {company.lastEmployeeCode}
      </p>
      <p className={styles.companyDetails}>
        <strong>Overall Tenure:</strong> {company.overAllTenureWithDate}
      </p>
      <p className={styles.companyDetails}>
        <strong>Order:</strong> {company.order}
      </p>
      <p className={`${styles.companyDetails} ${styles.companyWebsite}`}>
        <strong>Website:</strong>{' '}
        <a href={company.companyWebsiteURL} target="_blank" rel="noopener noreferrer">
          {company.companyWebsiteURL}
        </a>
      </p>
      <div className={styles.aboutCompany}>
        <strong>About Company:</strong>
        <ul>
          {company.aboutCompany.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyCardV1_0_0;
