import React from 'react';
import { render, screen } from "@testing-library/react";
import AdministrationFields from "../AdministrationFields";
import { Form } from 'antd';

describe("AdministrationFields", () => {
    it("should render correctly", () => {
        render(
            <Form>
                <AdministrationFields />
            </Form>
        );

        expect(screen.getByText("Teste")).toBeInTheDocument();

        expect(screen.getByLabelText("% Lucro")).toBeInTheDocument();
        expect(screen.getByLabelText("% Imposto")).toBeInTheDocument();
        expect(screen.getByLabelText("% Projetista")).toBeInTheDocument();
        expect(screen.getByLabelText("% Vendedor")).toBeInTheDocument();
        expect(screen.getByLabelText("% Montador")).toBeInTheDocument();

        expect(screen.getByLabelText("% Lucro").closest('input')).toBeInTheDocument();
        expect(screen.getByLabelText("% Imposto").closest('input')).toBeInTheDocument();
        expect(screen.getByLabelText("% Projetista").closest('input')).toBeInTheDocument();
        expect(screen.getByLabelText("% Vendedor").closest('input')).toBeInTheDocument();
        expect(screen.getByLabelText("% Montador").closest('input')).toBeInTheDocument();
    });
});