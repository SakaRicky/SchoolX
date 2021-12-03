import React from 'react';
import styles from 'styles/teacherCard.module.scss';
import Link from 'next/link';
import { Teacher } from 'types';
import Image from 'next/image'


interface TeacherCardProps {
    teacher: Teacher
}

export const TeacherCard = ({teacher}: TeacherCardProps) => {
    
    return (
        <div className={styles.root}>
            <div className={styles.logo}>
                <Image
                    src={teacher?.gender === 'male' ? "/images/black-man.png" : "/images/woman.png"}
                    alt="Student Image"
                    width={100}
                    height={100}
                />
            </div>
            <div className={styles.details}>
                <h2>{teacher.first_name}</h2>
                <h3>{teacher.subject}</h3>
                <Link href={`teachers/${teacher.id}`} passHref={true}>View Profile</Link>
            </div>
        </div>
    )
}