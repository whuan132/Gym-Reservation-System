let profile_pictures: { [id: string]: string } = {};
let blog_pictures: { [id: string]: string } = {};

const BLOG_PIC_ARR = [
  "https://media.istockphoto.com/id/1265038811/photo/beautiful-young-woman-training-with-kettlebell-in-gym.jpg?s=612x612&w=0&k=20&c=MfMSFaBSk8JYPj64aqtFfo1HVdY5RIKoh5l2UCdEvls=",
  "https://media.istockphoto.com/id/639897878/photo/sporty-girl-doing-weight-exercises-with-assistance-of-personal-trainer.jpg?s=612x612&w=0&k=20&c=sON-gorgRvzwa593BMNTKHakl0SINckU5bgeUjkMtfI=",
  "https://media.istockphoto.com/id/1332406173/photo/body-positive-asian-mixed-race-teenage-girl-carrying-dumbbells-looking-at-mirror-reflection.jpg?s=612x612&w=0&k=20&c=FUAoIhe9mqe32qkZQqzWOFwkgmUb1IksJEPZ6FdOMGM=",
  "https://media.istockphoto.com/id/1147772622/photo/sportswoman-exercising-with-battling-ropes.jpg?s=612x612&w=0&k=20&c=vEOGRWaA60R3lxsKmFtK6XdDjhorD5BoPwXkG6Ckpj4=",
  "https://media.istockphoto.com/id/624193172/photo/woman-working-out-at-fitness-club.jpg?s=612x612&w=0&k=20&c=nl9gt4VxaYfVOnWxIkMBbVENUteYURxoE9Niy0IN9IM=",
  "https://media.istockphoto.com/id/598674608/photo/young-woman-hang-up-hand-weights.jpg?s=612x612&w=0&k=20&c=zKIZ8Y6Nlj0EtGLCNc42-xdn77MyQDDfgKjhNDKRTuk=",
  "https://media.istockphoto.com/id/518763654/photo/athletic-girl-focused-on-fitness-training-with-ropes-at-gym.jpg?s=612x612&w=0&k=20&c=9opmqx_jUpeqtrJzVqUNGMqbNgoY7Sp4J4YgjMXDU4g=",
  "https://media.istockphoto.com/id/1015269650/photo/woman-doing-cross-training-routine.jpg?s=612x612&w=0&k=20&c=k0fBzGEo4P6McIBQv87YyKQ9b9vo__03n_GzwUpznB0=",
  "https://media.istockphoto.com/id/514738988/photo/stretching-to-touch-their-toes.jpg?s=612x612&w=0&k=20&c=-lYzXMXZdBPpYxO92FDzBIUGuF8UQ8Ubc2cwUqCOeJY=",
  "https://media.istockphoto.com/id/1253589898/photo/smile-man-and-women-making-hands-together-in-fitness-gym-group-of-young-people-doing-high.jpg?s=612x612&w=0&k=20&c=0pAYROA22DUmxY6eZQXv1ZquIS0QIQf-bhKbWLvvVPg=",
  "https://media.istockphoto.com/id/1250180459/photo/smiling-sporty-woman-cycling-at-health-club.jpg?s=612x612&w=0&k=20&c=8f4-tRR1bHymwQ0sBXnWLN76PUBChvwn9NoZuLe_mkg=",
  "https://media.istockphoto.com/id/1132187883/photo/young-asian-healthy-and-happy-beautiful-fitness-female-athlete-in-sportswear-having-arms.jpg?s=612x612&w=0&k=20&c=KmlU9iGnRlmgyAbTTEX7wNwaQmmllR7zb8GKGET7k9M=",
  "https://media.istockphoto.com/id/534699021/photo/floor-exercise-the-side-plank-in-an-exercise-studio.jpg?s=612x612&w=0&k=20&c=JiFRlu953FtgNYQ8D9h-XcAcYZDQuHsOt-9rRWY10-4=",
  "https://media.istockphoto.com/id/914755598/photo/group-of-young-sporty-girls-with-yoga-mats-copyspace.jpg?s=612x612&w=0&k=20&c=tUL2sS9oIVk-7sBQZlrfNUPvuJhAQQQ1stJzjql2EQ4=",
  "https://media.istockphoto.com/id/1172566715/photo/little-girl-doing-pushups-in-gym-class.jpg?s=612x612&w=0&k=20&c=6D-5GsdloqVMI1EbHtuhYiGsBv3PQ9hlLioxaignj5o=",
  "https://media.istockphoto.com/id/1148711477/photo/be-the-best-you-can-be.jpg?s=612x612&w=0&k=20&c=OrgKqhXCKsOdE8DiXto_j99w-Ln4QzjK4CILq3NcvpI=",
  "https://media.istockphoto.com/id/614709150/photo/determined-female-athlete.jpg?s=612x612&w=0&k=20&c=Blu8U3jd1Cp_q9c-lWOxfSlWouzd3xeXG5tykJo5ZgQ=",
  "https://media.istockphoto.com/id/639898656/photo/beautiful-fitness-woman-lifting-dumbbells.jpg?s=612x612&w=0&k=20&c=m2Gf3XG1dGTdL0eymZ-Ue3IR40GksPglN_3fhdI_BvM=",
  "https://media.istockphoto.com/id/664174886/photo/what-a-great-workout.jpg?s=612x612&w=0&k=20&c=YzTtukyzbQc_hoope2gD_Er9oslmE-EBq-kuRRFGGW0=",
  "https://media.istockphoto.com/id/943301778/photo/girls-working-out-in-fitness-studio-with-medicine-ball.jpg?s=612x612&w=0&k=20&c=WHRYZ3MAcaxU3Xr9ZYsNRdBavb14ATl4HSSi6XGSsXI=",
  "https://media.istockphoto.com/id/1250180429/photo/smiling-female-athletes-cycling-in-gym.jpg?s=612x612&w=0&k=20&c=uBSAJlUIbMni7zxx_BZUTngAHVSR2XRU9XZ1sfj86B4=",
  "https://media.istockphoto.com/id/467582499/photo/fitness-with-barbell.jpg?s=612x612&w=0&k=20&c=dN6qOsEa1z79AAyEmq5Muj2aI0gpbB5EP1YTgB7HRPE=",
  "https://media.istockphoto.com/id/516329172/photo/athletic-girl-efforting-on-gym-training-with-ropes-at-gym.jpg?s=612x612&w=0&k=20&c=z1NNYasM1F3DHZu7uIhoSeur-3FbUdJOQZR28CQ4Ci4=",
  "https://media.istockphoto.com/id/1158540068/photo/asian-women-resting-after-play-yoga-and-exercise-at-home-background-with-copy-space-exercise.jpg?s=612x612&w=0&k=20&c=Dgul5KqrGEvSw9QmtKvIZb0sdH1XuFDsKI2J9ln9kzc=",
  "https://media.istockphoto.com/id/636103812/photo/oung-beautiful-girl-working-out-in-modern-gym.jpg?s=612x612&w=0&k=20&c=aXNAOQ47-zkMtmAIZYAEIqtLueBOoAcL0SH3HSV7-GM=",
  "https://media.istockphoto.com/id/1420012998/photo/portrait-of-athlete-man-and-woman-in-sportswear-crossing-arms-in-gym-latino-sportswoman-and.jpg?s=612x612&w=0&k=20&c=hXK3uFtQhquQc9OkyImpXtQgAGF9QNOOAaHlXS5lKa4=",
  "https://media.istockphoto.com/id/1519430184/photo/high-school-students-talking-with-female-teacher-in-gym.jpg?s=612x612&w=0&k=20&c=La--pApIXc13XFq1TdPtCo3iH-fp1D7WSwlI62MN2wg=",
  "https://media.istockphoto.com/id/1018192808/photo/monitoring-her-fitness-performance-on-smartwatch.jpg?s=612x612&w=0&k=20&c=DXJu5Kx14-J4EOOVWFlZLFo_ZZzvXEeQOnqB1etorCc=",
  "https://media.istockphoto.com/id/1489800629/photo/a-karate-girl-trains-in-a-kimono-with-punches-and-kicks.jpg?s=612x612&w=0&k=20&c=dxyu-ROTtj6QBI20b_I-xKTXpn16TbDFH3hwrtGc3tc=",
  "https://media.istockphoto.com/id/470996100/photo/beautiful-girl-in-the-gym.jpg?s=612x612&w=0&k=20&c=wABgM6AaVhc_khKxVj3KeNhCIj8KGSYNrlSRhGEhOZQ=",
  "https://media.istockphoto.com/id/1180164420/photo/boxing-in-the-gym.jpg?s=612x612&w=0&k=20&c=yRsuikEiANA4ZB7K9QIYHNkyc1dM_j9PHWvLWw3RkDE=",
  "https://media.istockphoto.com/id/1000911802/photo/fit-beautiful-young-woman-caucasian-posing-at-the-camera-in-sportswear-young-woman-holding.jpg?s=612x612&w=0&k=20&c=gOzzQY_c3cljVQm7cjAsNZ72x5-mJsca6VX8nHG5E8Q=",
  "https://media.istockphoto.com/id/671518598/photo/girls-high-school-volleyball-team.jpg?s=612x612&w=0&k=20&c=ptJGlqxSfN7jPjyphPjLc23EnoBPE_iMX00abHRLY24=",
  "https://media.istockphoto.com/id/1017593900/photo/fitness-woman-doing-lunges-exercises-for-leg-muscle-workout-training-in-gym-active-girl-doing.jpg?s=612x612&w=0&k=20&c=xD8vBFSmfQlwrEhYMF45rd9VgG_b10hRWXoPOuC4RWE=",
  "https://media.istockphoto.com/id/157330958/photo/young-woman-exercising-lunges-with-weights.jpg?s=612x612&w=0&k=20&c=y9b82TT4TpYA827IXDKfknIrc-aZWjcvctSjFTDO_wg=",
  "https://media.istockphoto.com/id/1362555661/photo/two-women-in-fashionable-sports-clothes-relaxing-after-training-taking-selfie-for-social.jpg?s=612x612&w=0&k=20&c=h9NgDu6FRRhY07Pkg8jYA3Ob4d37xzhOqtfyRHALh1w=",
  "https://media.istockphoto.com/id/187756105/photo/group-of-children-with-coach-in-school-gym.jpg?s=612x612&w=0&k=20&c=R0Z99nRn9Qr5BNwUvfHRiqeCZ-PIx6d1IM3PoduynvA=",
  "https://media.istockphoto.com/id/927354634/photo/girl-resting-after-exercises-in-the-gym.jpg?s=612x612&w=0&k=20&c=Bk-GevI3b6Js0wQFb66A4MA2-ZRm-FRIxAGvynqxi1c=",
  "https://media.istockphoto.com/id/873720846/photo/sport-women-with-pouder-for-exercise.jpg?s=612x612&w=0&k=20&c=_WpM2EINtRVFO0SRtX56KtMjJ9Eu6Mx3-KmEcRldbbE=",
  "https://media.istockphoto.com/id/1161570487/photo/portrait-of-pretty-sporty-girl-holding-weights-dumbbells-and-make-exercises.jpg?s=612x612&w=0&k=20&c=UHuGT-NAuw37mxqicAcRaJbmw9B7OBncJJCLkF_TfR8=",
  "https://media.istockphoto.com/id/482833886/photo/teen-girl-doing-a-lunge-warm-up-exercise.jpg?s=612x612&w=0&k=20&c=8e93lNMukNZwt3WgwP3KckM9w-yUM36uUWPCZigbFnQ=",
  "https://media.istockphoto.com/id/637024764/photo/top-view-of-shavasana-yoga-posture.jpg?s=612x612&w=0&k=20&c=Zcao4uQ7UEluCwdYg9jbTkc1b6KO_mrwLQZtK0-cjZc=",
  "https://media.istockphoto.com/id/521264196/photo/warming-up-for-a-boxing-match.jpg?s=612x612&w=0&k=20&c=kwl-UGbhkjTbkIRcMgJemwHn5gqqFq_adm9Edi1YLp4=",
  "https://media.istockphoto.com/id/1198930471/photo/group-of-multi-ethnics-people-learning-yoga-class-in-fitness-club-female-caucasian-instructor.jpg?s=612x612&w=0&k=20&c=JGKNpLSaaHoLnjlSw2GPacENtgsgJE_0cVWo4QAzNfk=",
  "https://media.istockphoto.com/id/1136837947/photo/mother-and-daughter-working-out-together-doing-exercise-at-home.jpg?s=612x612&w=0&k=20&c=LPuaU0s3qI7XqLeTgAZuqTdof_jw_JlWBdgkJIt5NGM=",
  "https://media.istockphoto.com/id/936417082/photo/young-beautiful-woman-in-sportswear-doing-squat.jpg?s=612x612&w=0&k=20&c=uX4xD6BtY8P4vFRY_GTZJbtZzOhkPbL3t_hYl-K7BKc=",
  "https://media.istockphoto.com/id/886128600/photo/girl-teenager-doing-sports.jpg?s=612x612&w=0&k=20&c=w-zx8gKrzbaCslNCwCtSVjiVdsrfAN7zdZcrdgirmos=",
  "https://media.istockphoto.com/id/540505398/photo/girl-dancing-in-hall-rhythmic-gymnastics.jpg?s=612x612&w=0&k=20&c=p3LNurWSvmhFBLQI8d-iZR0_nZi0-zU3jd1WRAbd0z0=",
  "https://media.istockphoto.com/id/498368374/photo/little-girl-in-gym-class.jpg?s=612x612&w=0&k=20&c=Q835SLmSD6NGvFtvtS3DkTgXr1ZxextPA2tcdM5x_m8=",
  "https://media.istockphoto.com/id/1137930119/photo/a-portrait-of-young-girl-or-woman-doing-cardio-workout-in-a-gym.jpg?s=612x612&w=0&k=20&c=U-NTLxOwKQccRQLJvWPcGezwReIkI_7nCQoDK0tdLkI=",
  "https://media.istockphoto.com/id/468936082/photo/young-children-practicing-dance.jpg?s=612x612&w=0&k=20&c=AwIlkwCmxCXyJVZq-NML1J50iWg6jG0g2UNPzxKcRwg=",
  "https://media.istockphoto.com/id/532344248/photo/preparation-for-salamba-sirsasana.jpg?s=612x612&w=0&k=20&c=Ud8W4m_2cZRbZyMP89Pv_fh7rTS-AjlgOiEZtwnszUU=",
  "https://media.istockphoto.com/id/893359554/photo/small-boxer-exercising-punches-on-a-sports-training-in-a-gym.jpg?s=612x612&w=0&k=20&c=_0lfq4GMkuan_RIY_QE2d0SElLgFfVkQCNDzqSechho=",
  "https://media.istockphoto.com/id/637376066/photo/young-and-determined-asian-girl-on-fitness-ball-at-gym.jpg?s=612x612&w=0&k=20&c=l-13WQM1KO4NUKLDAd7Efy9pCK-7o6LnpRDYwOKfY5I=",
  "https://media.istockphoto.com/id/1434471961/photo/childrens-fitness-class.jpg?s=612x612&w=0&k=20&c=X5NP3EpR9Hb9QD8DDtvnZm7xvKNHbHF6qEzbnoARUDQ=",
  "https://media.istockphoto.com/id/824201436/photo/asian-chinese-little-girl-playing-indoor.jpg?s=612x612&w=0&k=20&c=aawJnTamd3iCktG0O7KwT2sJ1VsRiqRcx9800rtRNEk=",
  "https://media.istockphoto.com/id/1134313886/photo/practicing-boxing.jpg?s=612x612&w=0&k=20&c=UxA5XJyiyguFvEswb7QF_9vwZLv8WmQFpiVWma6_QN8=",
  "https://media.istockphoto.com/id/943301268/photo/young-woman-resting-after-workout-at-gym.jpg?s=612x612&w=0&k=20&c=vHnPzG5zwT1cKoE5YjVbOmWH6lnfonSjJbXRzdShW-c=",
  "https://media.istockphoto.com/id/1454026690/photo/portrait-of-female-volleyball-player-holding-a-volleyball-ball-at-sports-court.jpg?s=612x612&w=0&k=20&c=h8FYR3jvBj7k-clbvJf1bCLWkpg_5uO66QPHk-mp6ic=",
  "https://media.istockphoto.com/id/1247981111/photo/african-american-girl-smiling-at-camera-while-exercising-using-dumbbell-in-gym-together-with.jpg?s=612x612&w=0&k=20&c=-XfbPWIiDCqGO9NZpqdd5tqSCtAwx3SvNIeNQ_ZXUn8=",
  "https://media.istockphoto.com/id/671375670/photo/jogging.jpg?s=612x612&w=0&k=20&c=BTpFOufESheloi1p2NxuTxjtX0useRbw4flliZ_Ih7A=",
  "https://media.istockphoto.com/id/521471880/photo/teenage-dancer-girl-doing-handstand.jpg?s=612x612&w=0&k=20&c=nf8wy9s62ahkCkPTX8V46eunXcNf7XnhduRXjh7w1I8=",
  "https://media.istockphoto.com/id/1476107958/photo/girl-walking-on-the-treadmill.jpg?s=612x612&w=0&k=20&c=JYKsuz1QWvnT17w13iIaidSgWNiOSkmGFkWSOiqzZ1A=",
  "https://media.istockphoto.com/id/668100468/photo/fit-group-smiling-and-jumping.jpg?s=612x612&w=0&k=20&c=gNFxgS5D99TlQWgXGdCGVADXTb1lSnhvuIJgZ_8tzGI=",
  "https://media.istockphoto.com/id/607485814/photo/dribbling-basketballs-up-the-court.jpg?s=612x612&w=0&k=20&c=MGhbm6dAhQfyy8EjT2BJWT0NdXtVpdcp7aVqwn85ndA=",
  "https://media.istockphoto.com/id/610137550/photo/woman-doing-exercises-in-the-gym.jpg?s=612x612&w=0&k=20&c=i52NL7Zd8JSWUw80oRoluHB5YFGbEuZ_WrfsNzXhANI=",
  "https://media.istockphoto.com/id/1454027730/photo/sports-female-team-stacking-hands-on-a-inspirational-speech.jpg?s=612x612&w=0&k=20&c=XyFBt5lhOBu8JR7f7EPe7urZ0_jhCRPTkoDSXZWuITM=",
  "https://media.istockphoto.com/id/535446380/photo/young-sporty-woman-lifting-steel-dumbbell-in-gym.jpg?s=612x612&w=0&k=20&c=2zHsJpulHU6eE1CYT6p3o321xy5B7-7Am9JmTiGInnE=",
  "https://media.istockphoto.com/id/501508480/photo/teen-girl-in-a-sports-hall.jpg?s=612x612&w=0&k=20&c=q1rQuRnSoPzabA7ysEHNMcorPAR-laxRLeCEmfu_qzE=",
  "https://media.istockphoto.com/id/825534126/photo/girl-getting-ready-for-training.jpg?s=612x612&w=0&k=20&c=ZYrWdIE6GKvKpVOT8B21ZlglRUSCWAlvVD372D43x5Q=",
  "https://media.istockphoto.com/id/601922130/photo/sitting-on-the-bench-before-the-game.jpg?s=612x612&w=0&k=20&c=lt9fPYTuCKHLqVn1SiVzsDa7pN9gufg91ZIi-kQdOK4=",
  "https://media.istockphoto.com/id/1124741961/photo/woman-in-fitness-club.jpg?s=612x612&w=0&k=20&c=q3MggEF6VrhNICqa6RRfLWyC3ouPXJBD6i-ytb2zdek=",
  "https://media.istockphoto.com/id/904192220/photo/ready-for-handstand-pose.jpg?s=612x612&w=0&k=20&c=EhYezhL9iUwjkqGmlRkFyBBEVMi6ToTw-4ujHzdjoaw=",
  "https://media.istockphoto.com/id/1207547911/photo/healthy-women-giving-high-five-to-each-other-while-pushing-up-in-the-fitness-gym-sporty-girl.jpg?s=612x612&w=0&k=20&c=1Zt2S9qv7iuLqLPPOKxYxrxgpBbWLB0JPJDGBZ6Rgok=",
  "https://media.istockphoto.com/id/484167788/photo/smiling-young-woman-lifting-a-barbell-in-a-grungy-setting.jpg?s=612x612&w=0&k=20&c=zxjXF6X8cw8OrNOufJCZ9AqdgWkZwEt5VE7B9TeDd7w=",
  "https://media.istockphoto.com/id/486102084/photo/healthy-teen-couple-with-weights.jpg?s=612x612&w=0&k=20&c=57muOWmk3UdKNcPElX97_ywf_x-QdF8uwyXewfYEMKY=",
  "https://media.istockphoto.com/id/1473205049/photo/portrait-of-young-woman-on-pilates-class-at-gym.jpg?s=612x612&w=0&k=20&c=AKWxkaFb1cliezKM_9K3JAPIQRh-sSyvk7xd770cw4Y=",
  "https://media.istockphoto.com/id/941184142/photo/two-young-motivated-aggressive-attractive-focused-sporty-active-girls-doing-push-ups-and.jpg?s=612x612&w=0&k=20&c=G4SDiQGFPuR-eTO4_ZO7nywRTgRmR3Za1OBpVORfT_M=",
  "https://media.istockphoto.com/id/1492735974/photo/adult-woman-with-family-practicing-yoga-in-studio.jpg?s=612x612&w=0&k=20&c=gkZC6HRC_WgOFPv7ODM_Zj50TDdK5zNp9o_pmSJB65I=",
  "https://media.istockphoto.com/id/695604058/photo/many-activities.jpg?s=612x612&w=0&k=20&c=LF08s_7sA_AVZD84eFMacXLwrLyRT7qH2KVqSUNfWFM=",
  "https://media.istockphoto.com/id/525979142/photo/girl-having-a-break.jpg?s=612x612&w=0&k=20&c=kM1bvmWF9GZZP7tBqFnJrAdXMXL58nJRpwAFEvZJ8ms=",
  "https://media.istockphoto.com/id/1338115159/photo/streching.jpg?s=612x612&w=0&k=20&c=W_9GL8FP0oMPcVVEf78Z6hgUjkyzoTvuDHQSVBnA5K4=",
  "https://media.istockphoto.com/id/493082880/photo/boy-dribbling-a-basketball.jpg?s=612x612&w=0&k=20&c=p1KTueMm9BRcjGiDbM5_AdMS2Sy7AXcWOruFVfbVm1A=",
  "https://media.istockphoto.com/id/802114620/photo/girl-getting-ready-for-training.jpg?s=612x612&w=0&k=20&c=AjiFKaAR9SDFpqJ-fXpYf09TvSZgYoRXB5xrl5sHV7I=",
  "https://media.istockphoto.com/id/1415358275/photo/kids-practicing-penalty-kicks-and-playing-soccer-female-goalkeeper-playing-football-with.jpg?s=612x612&w=0&k=20&c=k8r7YOdxj-x_6XfpmlntLnk70Y583n2DjZ8ByCKz920=",
  "https://media.istockphoto.com/id/1022823956/photo/fit-sporty-girl-with-towel-and-water-bottle-in-gym.jpg?s=612x612&w=0&k=20&c=JI5HZ0lqFv9DRCUnkQ48mCigXiucTqeBAKS-DerRNmg=",
  "https://media.istockphoto.com/id/492802386/photo/crawling-over-gymnastics-mats.jpg?s=612x612&w=0&k=20&c=D5V63XR0AE7iI_-_sVIOWK_0WpEkQAZC5R_7QUwFQ3M=",
  "https://media.istockphoto.com/id/608001792/photo/aerobics-at-gym.jpg?s=612x612&w=0&k=20&c=zuqs2kyqGexD3uPN3im9if2Z7xOT8Oe4sDsncGojjGg=",
  "https://media.istockphoto.com/id/899577328/photo/flexing-for-the-camera.jpg?s=612x612&w=0&k=20&c=h5gXD9FvNwOLwyVpNmkF-QSZvHQ6tD7ZMYVKFfegqh0=",
  "https://media.istockphoto.com/id/944620180/photo/happy-young-women-with-exercise-mats-laughing-together.jpg?s=612x612&w=0&k=20&c=S6udbjVYGdK_S8vqWIc6t8uN9uSxuZ_7tUCQDZHn1e8=",
  "https://media.istockphoto.com/id/629740926/photo/shes-gonna-be-strong-like-daddy.jpg?s=612x612&w=0&k=20&c=XY5TjxX-HQBrNMi5d1LJHQWpkpOlmDB70QEr1tlGuCc=",
  "https://media.istockphoto.com/id/147311502/photo/fitness-woman-full-length-on-white-background.jpg?s=612x612&w=0&k=20&c=4_P9Nn7G52EVV4CYBtneqnLIiz11sQgSaOsYOqpmszs=",
  "https://media.istockphoto.com/id/489699302/photo/women-spiking-and-blocking-a-volleyball.jpg?s=612x612&w=0&k=20&c=eSnMWORi8fjVZVNwmmUSvIWRVDgEQRfmVVgVD2uFo0E=",
  "https://media.istockphoto.com/id/921727056/photo/fitness-woman-at-stretching-training-outdoors.jpg?s=612x612&w=0&k=20&c=azTCS9-OBWHb7lxs7pg-MTLwneFXmODFZ2u5Ltdij9I=",
  "https://media.istockphoto.com/id/1280912843/photo/portrait-of-a-happy-girl-holding-a-soccer-ball-during-physical-activity-class.jpg?s=612x612&w=0&k=20&c=aoX4MP-YgLhN9cTKKbHFnUIVW5f4HCyKHHXjNCw7ygA=",
  "https://media.istockphoto.com/id/846236582/photo/group-of-young-sporty-smiling-people-in-plank-pose.jpg?s=612x612&w=0&k=20&c=XVlh93NVH029QjKWkcNFdnh1ev7AXKSY8CbWWbn95Es=",
  "https://media.istockphoto.com/id/513251508/photo/female-basketball-team-playing-in-japanese-high-school.jpg?s=612x612&w=0&k=20&c=D3Dsm6RlZXT2yGqKjmg8dCU_d7YAqV9JK_RLdsq1v1s=",
  "https://media.istockphoto.com/id/1084551444/photo/back-view-sporty-girl-in-pink-top-and-mini-shorts-raising-the-bar-while-making-squat.jpg?s=612x612&w=0&k=20&c=cO8_5ZcN6sGkSyBYCv1mI4NYo5SlSzX4Wha2umtrvcs=",
  "https://media.istockphoto.com/id/1431479621/photo/teenage-girl-streching-in-gym.jpg?s=612x612&w=0&k=20&c=ufKDvaxl7Vi5mlijLflmS_ERRGwMytn3mRzZtrMvqrk=",
  "https://media.istockphoto.com/id/1128824670/photo/asian-athlete-girl-in-sportswear-looking-into-the-mirror-while-tying-her-hair-in-fitness-gym.jpg?s=612x612&w=0&k=20&c=2gWQpfZyrZiGq0g_KgOE42Z3axxpJ0dUJRzFMKxWR4k=",
  "https://media.istockphoto.com/id/1083492182/photo/wheelchair-basketball.jpg?s=612x612&w=0&k=20&c=DZo7IT-DHfoPzK7qJQ-b7UO9cZ8_hUP73uuwvvnQhmc=",
  "https://media.istockphoto.com/id/636866060/photo/young-girl-atlete.jpg?s=612x612&w=0&k=20&c=L1h6pvl7rb-R5TWJg-57m3-TFG75k23vaqxMRo5AkY8=",
  "https://media.istockphoto.com/id/939825772/photo/girl-running-in-gym.jpg?s=612x612&w=0&k=20&c=7maPOLTKjR9esl4lg9MrIEKF3O9MB30WUzn7y9MQIBU=",
  "https://media.istockphoto.com/id/944711456/photo/sporty-girls-taking-selfie-while-sitting-on-exercise-bikes-in-gym.jpg?s=612x612&w=0&k=20&c=6Krg48EuhvOdiZ4knkT495XvPK3G7Iu2JhTQ_I-0MxM=",
  "https://media.istockphoto.com/id/1405692376/photo/young-woman-running-on-treadmill-at-the-gym-stock-photo.jpg?s=612x612&w=0&k=20&c=Lg5x25K6uiVyvhA_pNvXw65_BF-ayaJxXeJTeRdBxB4=",
  "https://media.istockphoto.com/id/1249653117/photo/caucasian-girl-smiling-at-camera-while-exercising-using-dumbbell-in-gym-together-with-female.jpg?s=612x612&w=0&k=20&c=u7XVIFyGyOHpuDHmKWM32Cftc8LcOfN53Bmez171_lc=",
  "https://media.istockphoto.com/id/1398966083/photo/elementary-school-children-sitting-in-circle-in-gym-with-teacher.jpg?s=612x612&w=0&k=20&c=Tsl9LvegU-2AimMGhHNVDKRNcUwdSiu4hlkcysEiL4s=",
  "https://media.istockphoto.com/id/1091372952/photo/young-caucasian-sporty-woman-running-on-treadmill-gym-interior.jpg?s=612x612&w=0&k=20&c=rfICjiUdotHgmj9iZ0MttzoCnTl2nwn-BR-sdxZIeD4=",
  "https://media.istockphoto.com/id/480585359/photo/superhero-training.jpg?s=612x612&w=0&k=20&c=sC33L0dMgTZqgc2p32c-NzvbhE6_Xhi4-5uerxEleS8=",
  "https://media.istockphoto.com/id/909332624/photo/sport-woman-sitting-and-resting-after-workout-or-exercise-in-fitness-gym-with-protein-shake-or.jpg?s=612x612&w=0&k=20&c=phCX3qIxQ3gS1SFXPcBJ9OEN_b-scHZYcpI_JV-zqlU=",
  "https://media.istockphoto.com/id/847353894/photo/racing.jpg?s=612x612&w=0&k=20&c=4omvwE1XfQtwWYd1urQ-noujNAecmAwrZgqKxO39YUk=",
  "https://media.istockphoto.com/id/1226091713/photo/team-performance-portrait-of-teenage-boy-doing-push-up-exercising-together-with-other-kids-in.jpg?s=612x612&w=0&k=20&c=3ijMV-MxsuXjzysG93jiVqvFsECTVWKTNLpsTyM5bxA=",
  "https://media.istockphoto.com/id/899902574/photo/taking-a-rest.jpg?s=612x612&w=0&k=20&c=TfRPAx9QWMA6t-vODMIGuOdrq25Asp_rtfFx8ScuCw0=",
  "https://media.istockphoto.com/id/1258462735/photo/portrait-of-confident-beautiful-asian-fitness-woman-standing-after-exercise-isolated-on-blue.jpg?s=612x612&w=0&k=20&c=OiHmfbLkI1Mbs81Mye69KNHgFt28JfK_WicXyp0GpL8=",
  "https://media.istockphoto.com/id/466045917/photo/group-of-children-with-coach-in-school-gym.jpg?s=612x612&w=0&k=20&c=tDvWTD2vrkHgex1BEev9Ktr2Df0clr8G45nwmOh8Rag=",
  "https://media.istockphoto.com/id/1427491253/photo/african-american-sportswoman-and-latino-girl-workout-together-in-gym-attractive-beautiful-two.jpg?s=612x612&w=0&k=20&c=IA3CXvknYyzdPCfq1T7aTicipYPrhUPeDGR3aq4OxMA=",
  "https://media.istockphoto.com/id/479972092/photo/volleyball-training.jpg?s=612x612&w=0&k=20&c=EJgYF1pK7XLItCgjLzIrouNCv546-iwlxgsuiN9eb5s=",
  "https://media.istockphoto.com/id/1247979532/photo/we-are-strong-happy-female-trainer-and-positive-children-showing-muscles-while-smiling-at.jpg?s=612x612&w=0&k=20&c=aShLFvsFAr0lPoUDCsXRPf3UW2ana3kb8b8hBPy-yGE=",
  "https://media.istockphoto.com/id/476859962/photo/japanese-high-school-a-school-gymnasium-children-play-basketball.jpg?s=612x612&w=0&k=20&c=5ponOd6CxWocMNNBN67vB002xTR2XnyfeHt-I6o56I8=",
  "https://media.istockphoto.com/id/498130725/photo/high-school-volleyball-match-in-gymnasium.jpg?s=612x612&w=0&k=20&c=2TI5pjGUxGW6qrrbWUZnGDH_P7RkhUbopDIyhT22pkE=",
];

const IconHelper = {
  bootstrap: () => {
    const data = localStorage.getItem("GR-PROFILE-PICTURES");
    if (data) {
      profile_pictures = JSON.parse(data);
    }
    const data2 = localStorage.getItem("GR-BLOG-PICTURES");
    if (data2) {
      blog_pictures = JSON.parse(data2);
    }
  },

  getRandomProfilePicture: (id: string = ""): string => {
    if (id && profile_pictures[id] !== undefined) {
      return profile_pictures[id];
    }
    const random = Math.floor(Math.random() * 5) + 1;
    const picture = `https://flowbite.com/docs/images/people/profile-picture-${random}.jpg`;
    if (id) {
      profile_pictures[id] = picture;
      localStorage.setItem(
        "GR-PROFILE-PICTURES",
        JSON.stringify(profile_pictures),
      );
    }
    return picture;
  },

  getRandomPicture: (id: string) => {
    if (id && blog_pictures[id] !== undefined) {
      return blog_pictures[id];
    }
    const random = Math.floor(Math.random() * BLOG_PIC_ARR.length);
    const picture = BLOG_PIC_ARR[random];
    if (id) {
      blog_pictures[id] = picture;
      localStorage.setItem("GR-BLOG-PICTURES", JSON.stringify(blog_pictures));
    }
    return picture;
  },
};

export default IconHelper;
