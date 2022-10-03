import React from "react";
import styles from "./teacherCard.module.scss";
import Link from "next/link";
import { User } from "types";
import Image from "next/image";

interface TeacherCardProps {
	user: User;
}

export const UserCard = ({ user }: TeacherCardProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.logo}>
				<Image
					src={
						user?.gender === "Male"
							? "/images/black-man.png"
							: "/images/woman.png"
					}
					alt="Student Image"
					width={100}
					height={100}
				/>
			</div>
			<div className={styles.details}>
				<h2>{user.firstName + " " + user.lastName}</h2>
				<h3>{user.subjectIds}</h3>
				<Link href={`users/${user.id}`} passHref={true}>
					View Profile
				</Link>
			</div>
		</div>
	);
};
