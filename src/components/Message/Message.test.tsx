import {render, screen} from '@testing-library/react'
import React from 'react'
import Message, {MessageProp} from './index'
import ReactTestUtils from 'react-dom/test-utils';

const messageText = 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
    'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
    'tempore vitae?'

const defaultProps: MessageProp = {
    itsMe: false,
    login: 'login 1',
    avatar: 'https://avatarfiles.alphacoders.com/798/79894.jpg',
    messageText,
    userId: 1,
    id: '1'
}

describe('Message component', () => {
    it('renders correctly', () => {
        const tree = ReactTestUtils
            .create(<Message{...defaultProps} itsMe={true}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    
    // it('Message rendering', () => {
    //     const message = render(
    //         <>
    //             <Message
    //                 {...defaultProps}
    //             />
    //         </>
    //     )
    //     expect(message).toMatchSnapshot()
    //
    // })
    // it('dinamyc styles not adds when flag true', () => {
    //         render(
    //             <Message
    //                 {...defaultProps}
    //                 itsMe={true}
    //             />
    //         )
    //         expect(screen.getByTestId('message__block')).toHaveClass('secondary')
    //         expect(screen.getByTestId('message')).toHaveClass('secondary')
    //     }
    // )
    // it('dinamyc styles not adds when flag false', () => {
    //         render(
    //             <Message
    //                 {...defaultProps}
    //                 itsMe={true}
    //             />
    //         )
    //         expect(screen.getByTestId('message__block')).not.toHaveClass('secondary')
    //         expect(screen.getByTestId('message')).not.toHaveClass('secondary')
    //     }
    // )
})











