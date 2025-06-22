import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useRef, useState } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setMenuIsOpen] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const formArticleRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formArticleRef,
		onChange: setMenuIsOpen,
	});

	const handleChange = (key: keyof ArticleStateType) => {
		return (val: (typeof defaultArticleState)[typeof key]) => {
			setArticleState((prevState) => ({
				...prevState,
				[key]: val,
			}));
		};
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(articleState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		onApply(articleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setMenuIsOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={formArticleRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.controlContainer}>
						<Text
							as={'h2'}
							weight={800}
							fontStyle='normal'
							uppercase={true}
							align='center'
							size={31}>
							задайте параметры
						</Text>
						<Select
							selected={articleState.fontFamilyOption}
							onChange={handleChange('fontFamilyOption')}
							options={fontFamilyOptions}
							title='шрифт'
						/>
						<RadioGroup
							selected={articleState.fontSizeOption}
							name='radio'
							onChange={handleChange('fontSizeOption')}
							options={fontSizeOptions}
							title='рАЗМЕР шрифта'
						/>
						<Select
							selected={articleState.fontColor}
							onChange={handleChange('fontColor')}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={articleState.backgroundColor}
							onChange={handleChange('backgroundColor')}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={articleState.contentWidth}
							onChange={handleChange('contentWidth')}
							options={contentWidthArr}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
