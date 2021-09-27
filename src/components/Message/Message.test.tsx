import {render,screen} from '@testing-library/react';
import React from 'react'
import Message from './index';


describe('Message component', () => {
    it('Message rendering', () => {
        const message = render(
            <>
                <Message
                    key={1}
                    itsMe={false}
                    login={'login 1'}
                    avatar={'https://avatarfiles.alphacoders.com/798/79894.jpg'}
                    description={'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt tempore vitae?'}
                    userId={1}
                    id={'1'}
                />
            </>
        );
        expect(message).toMatchSnapshot();
        
    })
    it('dinamyc styles works', () => {
            render(
                    <Message
                        key={1}
                        itsMe={false}
                        login={'login 1'}
                        avatar={'https://avatarfiles.alphacoders.com/798/79894.jpg'}
                        description={'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt tempore vitae?'}
                        userId={1}
                        id={'1'}
                    />
                    )
            expect(screen.getByText(/Lorem2/i)).toHaveClass('secondary');
        render(
            <Message
                key={1}
                itsMe={false}
                login={'login 1'}
                avatar={'https://avatarfiles.alphacoders.com/798/79894.jpg'}
                description={'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt tempore vitae?'}
                userId={1}
                id={'1'}
            />
        )
        expect(screen.getByText(/Lorem2/i)).toHaveClass('secondary');
        }
    )
})
