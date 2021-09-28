import React from "react";
import Message, {MessageProp} from "./index";
import {create, act} from "react-test-renderer";
import TestRenderer from 'react-test-renderer';

const messageText1 =
    "Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur " +
    "cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt " +
    "tempore vitae?";


const messageText2 =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem beatae cumque distinctio dolore dolorum earum," +
    " excepturi facilis fugit harum hic id iste iure maxime nobis obcaecati officia provident quam reprehenderit, sequi " +
    "tempore? Incidunt, reprehenderit, vel! Culpa deleniti enim eos est explicabo, facilis fuga fugiat inventore laboriosam " +
    "magni quasi totam ullam!";

const defaultProps1: MessageProp = {
    itsMe: false,
    login: "login 1",
    avatar: "",
    messageText: messageText1,
    userId: 1,
    id: "1",
};

const defaultProps2: MessageProp = {
    itsMe: false,
    login: "login 2",
    avatar: "",
    messageText: messageText2,
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
    
    it("dinamyc styles not adds when flag true with first props collection", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps1} itsMe={true}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage secondary');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock secondary');
    });
    
    it("dinamyc styles not adds when flag true with second props collection", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps2} itsMe={true}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage secondary');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock secondary');
    });
    
    it("dinamyc styles not adds when flag false with first props collection", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps1} itsMe={false}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock');
    });
    
    it("dinamyc styles not adds when flag false with second props collection", () => {
        const testRenderer = TestRenderer.create(<Message {...defaultProps2} itsMe={false}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByProps({"data-testid": "message__block"}).props['className']).toBe('wrapMessage');
        expect(testInstance.findByProps({"data-testid": "message"}).props['className']).toBe('messageBlock');
    });
});








