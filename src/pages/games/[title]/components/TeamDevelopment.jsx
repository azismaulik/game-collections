import CardBrowse from "@/components/CardBrowse";
import { apiCall } from "@/services/api";
import { useRouter } from "next/router";
import React from "react";

const TeamDevelopment = ({ name }) => {
  const router = useRouter();
  const { title } = router.query;

  const [team, setTeam] = React.useState([]);

  React.useEffect(() => {
    const getTeam = async () => {
      try {
        const response = await apiCall({
          base: `games/${title}/development-team`,
        });
        setTeam(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTeam();
  }, [title]);

  return (
    <>
      {team.length ? (
        <div className="w-full mt-8">
          <h1 className="text-2xl font-bold text-neutral-100">
            {name} created by
          </h1>
          <div className="w-full flex gap-4 py-4 overflow-auto scrollbar">
            {team?.map((item, i) => (
              <CardBrowse
                pathname="/creators"
                classNames="min-w-[300px]"
                key={i}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TeamDevelopment;
