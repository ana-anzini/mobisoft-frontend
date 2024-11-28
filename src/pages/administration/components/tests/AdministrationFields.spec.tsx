import React from 'react';
import { render, screen } from "@testing-library/react";
import AdministrationFields from "../AdministrationFields";
import { Form } from 'antd';

describe("AdministrationFields", () => {
    it("should render correctly", () => {
        render(<AdministrationFields />);

        expect(screen.getByText("Teste")).toBeInTheDocument();
    });
});