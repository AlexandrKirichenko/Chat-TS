import {render,screen} from '@testing-library/react';
import React from 'react'
import Message from './index';

const avatarUrl  = 'https://avatarfiles.alphacoders.com/798/79894.jpg';
const description= 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
    'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
    'tempore vitae?'
const description2='Lorem2 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
    'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
    'tempore vitae?'
const avatarUrl2 ='https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552_square.jpg'
describe('Message component', () => {
    it('Message rendering', () => {
        
        const message = render(
            <>
                <Message
                    key={1}
                    itsMe={false}
                    login={'login 1'}
                    avatar={avatarUrl}
                    description={description}
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
                        avatar={'avatarUrl'}
                        description={description}
                        userId={1}
                        id={'1'}
                    />
                    )
            expect(screen.getByText(/Lorem1/i)).toHaveClass('messageBlock');
       //     expect(screen.getByText(/Lorem1/i)).toHaveClass('wrapMessage');
        render(
            <Message
                key={2}
                itsMe={true}
                login={'login 2'}
                avatar={avatarUrl2}
                description={description2}
                userId={2}
                id={'2'}
            />
        )
        expect(screen.getByText(/Lorem2/i)).toHaveClass('secondary');
        }
    )
})
