import {render, screen} from '@testing-library/react'
import React from 'react'
import Message from './index'



describe('Message component', () => {
    it('Message rendering', () => {
        const message = render(
            <>
                <Message
                    key={1}
                    itsMe={false}
                    login={'login 1'}
                    avatar={avatar}
                    messageText={messageText}
                    userId={1}
                    id={'1'}
                />
            </>
        )
        expect(message).toMatchSnapshot()
        
    })
    it('dinamyc styles not adds when flag true', () => {
            render(
                <Message
                    key={2}
                    itsMe={true}
                    login={'login 2'}
                    avatar={avatar2}
                    messageText={messageText2}
                    userId={2}
                    id={'2'}
                />
            )
            expect(screen.getByTestId('message__block')).toHaveClass('secondary')
            expect(screen.getByTestId('message')).toHaveClass('secondary')
        }
    )
    it('dinamyc styles not adds when flag false', () => {
            render(
                <Message
                    key={1}
                    itsMe={false}
                    login={'login 1'}
                    avatar={'avatarUrl'}
                    messageText={messageText}
                    userId={1}
                    id={'1'}
                />
            )
            expect(screen.getByTestId('message__block')).not.toHaveClass('secondary')
            expect(screen.getByTestId('message')).not.toHaveClass('secondary')
        }
    )
})

const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg'
const messageText = 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
    'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
    'tempore vitae?'
const messageText2 = 'Lorem2 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
    'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
    'tempore vitae?'
const avatar2 = 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552_square.jpg'











