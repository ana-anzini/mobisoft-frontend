import React from 'react';
import { Form, Input, Select, Col, Row, Checkbox } from 'antd';
import { StatusType } from '../IProject';
import { statusTypeLabels } from './ProjectTable';

interface IFormFieldsFinancialProps {
    form: any;
}

const FormFields: React.FC<IFormFieldsFinancialProps> = ({ form }) => {
    return (
        <Row gutter={16}>
        </Row>
    );
};

export default FormFields;