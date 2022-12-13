import { Fragment, memo } from 'react';
// components
import Link from 'next/link';
import styled from '@emotion/styled';

const BreadcrumbWrapper = styled.div`
	width: 100%;

	margin-bottom: ${({ withMarginBottom }) => (withMarginBottom ? `1.5rem` : `0`)};
`;
const StyledLink = styled(Link)`
	width: 100%;

	color: rgb(var(--${({ iscurrentpage }) => (iscurrentpage ? `primary` : `gray`)}));
	font-size: 1.6rem;
	font-weight: 400;

	position: relative;

	transition: color 0.3s ease 0s;

	&::after {
		content: '';
		width: 100%;
		height: 0.1rem;

		background: rgb(var(--primary));

		position: absolute;
		bottom: 0;
		left: 0;

		transform-origin: right;
		transform: scaleX(0);
		transition: transform 0.3s ease 0s;
	}

	&:hover {
		color: rgb(var(--primary));

		&::after {
			transform-origin: left;
			transform: scaleX(1);
		}
	}
`;

const Slash = styled.span`
	color: rgb(var(--light-gray));
	font-size: 1.6rem;
	font-weight: 300;
`;

// links: { name: string, href: string }[]
// withMarginBottom: boolean (but it is will 0 or 1)

export const Breadcrumb = memo(({ links, withMarginBottom = 0, ...props }) => {
	if (!links || !links.length) {
		return <></>;
	}

	return (
		<BreadcrumbWrapper withMarginBottom={withMarginBottom} {...props}>
			{links.map((l, i) => {
				if (i < links.length - 1) {
					return (
						<Fragment key={l.href}>
							<StyledLink href={l.href}>{l.name}</StyledLink>
							<Slash> / </Slash>
						</Fragment>
					);
				}

				return (
					<StyledLink key={l.href} href={l.href} iscurrentpage={1}>
						{l.name}
					</StyledLink>
				);
			})}
		</BreadcrumbWrapper>
	);
});
