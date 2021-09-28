import React from "react";
import Message, {MessageProp} from "./index";
import {create, act} from "react-test-renderer";
import TestRenderer from 'react-test-renderer';

const messageText =
    "Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur " +
    "cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt " +
    "tempore vitae?";

const defaultProps1: MessageProp = {
    itsMe: false,
    login: "login 1",
    avatar: "",
    messageText: messageText,
    userId: 1,
    id: "1",
};

const defaultProps2: MessageProp = {
    itsMe: false,
    login: "login 2",
    avatar: "",
    messageText: messageText,
    userId: 2,
    id: "2",
};

let container: any;

describe("Message component", () => {
    it("renders correctly", () => {
        act(() => {
            container = create(<Message {...defaultProps1} itsMe={true}/>).toJSON();
            expect(container).toMatchSnapshot();
        });
    });
    
    it.each([
        [defaultProps1],
        [defaultProps2]
    
    ])('dinamyc styles not adds when flag true', (defaultProps)=>{
        const testRenderer = TestRenderer.create(<Message {...defaultProps} itsMe={false}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock');
    })
    
    it.each([
        [defaultProps1],
        [defaultProps2]
    
    ])('dinamyc styles not adds when flag false', (defaultProps)=>{
        const testRenderer = TestRenderer.create(<Message {...defaultProps} itsMe={false}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock');
    })
});








