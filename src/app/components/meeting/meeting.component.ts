import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as SimplePeer from 'simple-peer';

@Component({
    selector: 'app-meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
})
export class MeetingComponent implements OnInit, AfterViewInit {
    emiter;
    emiterOffer: string = '';
    receiverOffer: string = '';
    receiver;
    p: any = null;
    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.receiver = document.querySelector('#receiver-audio');
        this.emiter = document.querySelector('#emiter-audio');
    }

    startMeeting() {
        navigator.getUserMedia(
            {
                audio: true,
            },
            this.onMediaAcced,
            this.onMediaError
        );
    }

    onMediaAcced = (stream: MediaStream) => {
        // console.log('stream', stream);
        // debugger;

        this.p = new SimplePeer({
            initiator: true,
            stream: stream,
            trickle: false,
        });

        this.bindEvents(this.p);

        let emiter = document.querySelector('#emiter-audio') as any;
        if ('srcObject' in emiter) {
            emiter.srcObject = stream;
        } else {
            emiter.src = window.URL.createObjectURL(stream);
        }
        emiter.volume = 0;
        emiter.play();
    };

    stopMeeting = () => {
        (document.querySelector('#emiter-audio') as any).stop();
    };

    onMediaError = (error: any) => {
        console.log(' Error ', error);
    };
    /**
     * Peer event
     * @param p
     */
    bindEvents = (p: any) => {
        p.on('signal', this.onPeerSignal);
        p.on('error', (err: any) => console.log('perr Error', err));
        p.on('stream', this.stream);
    };

    onPeerSignal = (data: any) => {
        this.emiterOffer = JSON.stringify(data);
    };

    stream = (stream) => {
        console.log('stream', stream);
        let receiver = document.querySelector('#receiver-audio') as any;
        if ('srcObject' in receiver) {
            console.log('if');
            receiver.srcObject = stream;
        } else {
            console.log('else');
            receiver.src = window.URL.createObjectURL(stream);
        }
        receiver.volume = 0;
        receiver.play();
    };

    /** End Event */

    /**
     * joinMeeting
     */
    public joinMeeting = () => {
        console.log('joinMeeting offer');
        if (this.p === null) {
            this.p = new SimplePeer({
                initiator: false,
                trickle: false,
            });
        }
        this.p.signal(JSON.parse(this.receiverOffer));
        this.bindEvents(this.p);
    };
}
