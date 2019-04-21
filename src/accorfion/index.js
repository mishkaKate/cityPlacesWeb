import React from 'react';

export class Accordion extends React.Component {
    render() {
        return (
            <Accordion allowMultipleExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            моя информация
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p><span className={'name'}>Company name</span></p>
                        <p><span>Company description</span></p>
                        <div className='rating'>
                            <StarRatingComponent 
                                name={'rating'} 
                                starCount={10}
                                value={5}
                                editing={false} 
                            />
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                           редактирование
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <span>Имя</span><input></input>
                        <button>
                           добавить фото 
                        </button>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        );
    }
}