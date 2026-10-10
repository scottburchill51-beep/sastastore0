"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, X } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaTimeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import { useState } from "react";

import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type VideoPlayerProps = ComponentProps<typeof MediaController>;

function VideoPlayer({
  style,
  ...props
}: VideoPlayerProps) {
  return (
    <MediaController
      style={{
        ...style,
      }}
      {...props}
    />
  );
}

type VideoPlayerControlBarProps =
  ComponentProps<typeof MediaControlBar>;

function VideoPlayerControlBar(
  props: VideoPlayerControlBarProps,
) {
  return <MediaControlBar {...props} />;
}

type VideoPlayerTimeRangeProps =
  ComponentProps<typeof MediaTimeRange>;

function VideoPlayerTimeRange({
  className = "",
  ...props
}: VideoPlayerTimeRangeProps) {
  return (
    <MediaTimeRange
      className={`[--media-range-thumb-opacity:0] [--media-range-track-height:2px] ${className}`}
      {...props}
    />
  );
}

type VideoPlayerPlayButtonProps =
  ComponentProps<typeof MediaPlayButton>;

function VideoPlayerPlayButton({
  className = "",
  ...props
}: VideoPlayerPlayButtonProps) {
  return (
    <MediaPlayButton
      className={className}
      {...props}
    />
  );
}

type VideoPlayerMuteButtonProps =
  ComponentProps<typeof MediaMuteButton>;

function VideoPlayerMuteButton({
  className = "",
  ...props
}: VideoPlayerMuteButtonProps) {
  return (
    <MediaMuteButton
      className={className}
      {...props}
    />
  );
}

type VideoPlayerContentProps =
  ComponentProps<"video">;

function VideoPlayerContent({
  className = "",
  ...props
}: VideoPlayerContentProps) {
  return (
    <video
      className={className}
      {...props}
    />
  );
}

export function ShowreelVideo() {
  const [showVideo, setShowVideo] = useState(false);

  const spring = {
    mass: 0.1,
  };

  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const opacity = useSpring(0, spring);

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    opacity.set(1);

    const bounds =
      event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  }

  return (
    <Section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Work"
            title="See our digital work in action"
            description="Take a quick look at our creative work, digital services and projects."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <div
              onPointerMove={handlePointerMove}
              onPointerLeave={() => opacity.set(0)}
              onClick={() => setShowVideo(true)}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface"
            >
              <video
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              >
                <source
                  src="/showreel/sastastore-showreel.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

              <div className="absolute bottom-6 left-6 z-10 sm:bottom-8 sm:left-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  SastaStore Showreel
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Click to watch our work
                </h3>
              </div>

              <div className="absolute right-6 top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-black">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </div>

              <motion.div
                style={{
                  x,
                  y,
                  opacity,
                }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-xl md:flex"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Play
              </motion.div>
            </div>
          </div>
        </Reveal>
      </Container>

      <AnimatePresence>
        {showVideo ? (
          <VideoPopOver
            onClose={() => setShowVideo(false)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}

function VideoPopOver({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8">
      <motion.button
        type="button"
        aria-label="Close video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 h-full w-full bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
        }}
        className="relative z-10 aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
      >
        <VideoPlayer
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <VideoPlayerContent
            src="/showreel/sastastore-showreel.mp4"
            autoPlay
            playsInline
            slot="media"
            className="h-full w-full object-contain"
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>

          <VideoPlayerControlBar className="absolute bottom-0 left-0 flex w-full items-center bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
            <VideoPlayerPlayButton className="bg-transparent text-white" />

            <VideoPlayerTimeRange className="bg-transparent" />

            <VideoPlayerMuteButton className="bg-transparent text-white" />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
}