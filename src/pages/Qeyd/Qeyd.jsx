import { Title } from '../../components/Title/Title'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { Spinner } from '@chakra-ui/react'

export const Qeyd = () => {
    const { user, setUser, isLoading } = useContext(UserContext)

    if (isLoading) {
        return (
            <div className="spinner-container">
                {
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                }
            </div>
        )
    }

    return (
        <div className="qeyd">
            <Title title="Sayt haqqinda umumi qeydler" />
            <p className="qeyd-paragraph">
                Sayt texniki interview meqsedi ile qurulub. Saytin backendide
                qurdugum RESTful API, CRUD API den istifade etmisem. Ozellikle
                bloglar ucun search ve paginationu qura bilerdim, ancaq
                teleblerden kenara cixmamaga calismisam. Oz vebsaytimda
                Authentication ve Autherization ucun oz qurdugum
                Authenticationdan istifade edirem, Access ve Refresh Token ile.
                Halbuki bu saytda sadece localstorage-ə apidan gelen responsu
                birbasa atmisam, bu yontem hec meslehetli deyil cunki cox
                guvensiz bir yanasmadir. Ozellikle istifadecilerin sifreleri
                bcrypt modulu ile sifrelenmelidir ki hansiki bu zaman encrypted
                olunmus sifreni decrypt etmek olmur, sadece muqaise edile biler.
                Elave olaraq state management olaraq Context yapisindan istifade
                etmisem, normalda Redux isledirem ancaq son vaxtlar Context API
                ni isletmek cox rahat hal yaratdigindan layihelerimi onunla
                state yaradiram. Layihelerimde bir sira css kitabxanalarindan
                istifade edirem. Bu layihede Chakra UI -in Spinnerinden istifade
                etmisem sehifeler arasi kecid ucun. Sayti umumi full stack
                olaraq 3 saata qurmusam. Teleblerden kenara cixmamaga
                calismisam. Test layihe oldugu ucun dizayna cox fikir
                vermemisem. Istenilen cur figma dizaynini 1 pixeline qeder rahat
                kodlasdiriram dizayn olsa. Linkedn profilim :
                https://www.linkedin.com/in/emil-adishirinov-0a9836260/
            </p>
        </div>
    )
}
