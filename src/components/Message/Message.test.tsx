import React from "react";
import Message, {MessageProp} from "./index";
import {create, act} from "react-test-renderer";
import TestRenderer from 'react-test-renderer';

const messageText =
    "Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur " +
    "cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt " +
    "tempore vitae?";

const defaultProps: MessageProp = {
    itsMe: false,
    login: "login 1",
    avatar: "",
    messageText,
    userId: 1,
    id: "1",
};

describe("Message component", () => {
    it("renders correctly", () => {
        act(() => {
            const container = create(<Message {...defaultProps} itsMe={true}/>).toJSON();
            expect(container).toMatchSnapshot();
        });
    });
    it("dinamyc styles not adds when flag true", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps} itsMe={true}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message"}).props['className'].includes('secondary')).toBe(true);
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className'].includes('secondary')).toBe(true);
    });
    
    it("dinamyc styles not adds when flag false", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps} itsMe={false}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message"}).props['className'].includes('secondary')).toBe(false);
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className'].includes('secondary')).toBe(false);
    });
});









