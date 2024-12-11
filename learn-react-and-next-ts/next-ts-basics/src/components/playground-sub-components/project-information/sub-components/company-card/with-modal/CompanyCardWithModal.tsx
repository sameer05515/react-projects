import React from "react";
import { CompanyProps } from "../../../common/utils/types/data-type-definitions";
import CompanyCard from "../CompanyCardV1_0_1";
import { withModal } from "@/components/common/modal-overlay/ModalV3";

type CompanyCardModalProps = {
  company: CompanyProps;
  onClose: () => void;
};

// const CompanyCardWithModal = withModal(CompanyCard);

const CompanyCardWithModal: React.FC<CompanyCardModalProps> =
  withModal(CompanyCard);

export default CompanyCardWithModal;
