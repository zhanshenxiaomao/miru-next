"use client";
import CheckUpdate from "@/components/CheckUpdata";
import LoadingImg from "@/components/common/LoadingImg";
import ErrorView from "@/components/ErrorView";
import LoadingBox from "@/components/LoadingBox";
import { useRootStore } from "@/context/root-context";
import { getModel } from "@/utils/model";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n";

const ContinueVewing = observer(() => {
  const { settingsStore, historyStore } = useRootStore();
  const { t } = useTranslation("home");
  const { error, data, isLoading, refetch } = useQuery({
    queryKey: ["getHistoryData"],
    queryFn: async () =>
      historyStore.getHistoryByType(
        getModel(settingsStore.getSetting("model")),
        8
      ),
  });

  useEffect(() => {
    refetch();
  }, [settingsStore.getSetting("model"), historyStore.history]);

  if (isLoading) {
    return <LoadingBox></LoadingBox>;
  }

  if (error) {
    return <ErrorView error={error}></ErrorView>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-400 text-center m-14">
        <p>{t("no-continue-viewing.title")}</p>
        <p>{t("no-continue-viewing.message")}</p>
      </div>
    );
  }

  return (
    <div className="flex overflow-auto pb-3 scrollbar-none -ml-230px">
      <div className="ml-230px"></div>
      {data.map((history, index) => (
        <div
          className="mr-4 relative rounded-lg overflow-hidden flex-shrink-0"
          key={index}
          style={{ width: "350px", height: "200px" }}
        >
          <Link
            href={{
              pathname: "/watch",
              query: {
                pkg: history.package,
                url: history.url,
              },
            }}
          >
            {(history.type === "fikushon" && (
              <div className="w-full h-full ">
                <div className="m-auto  p-2 text-lg rounded bg-slate-200 h-full dark:bg-black dark:bg-opacity-40">
                  {history.cover as string}
                </div>
              </div>
            )) || (
              <LoadingImg
                className="object-cover w-full h-full"
                src={history.cover as string}
                alt={history.title}
              />
            )}
            <div className="absolute left-0 right-0 bottom-0 p-2 bg-gradient-to-t from-black">
              <p className=" text-neutral-300 text-xs mt-3 mb-1">
                <CheckUpdate
                  pkg={history.package}
                  url={history.url}
                ></CheckUpdate>{" "}
                看到 {history.chapter}
              </p>
              <p className="text-white">{history.title}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
});

export default ContinueVewing;
